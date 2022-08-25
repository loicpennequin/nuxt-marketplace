// THIS IS A COPY-PASTE OF THE TYPED ROUTR PACKAGE
// WITHOUT THE REFERENCE TO LODASH-ES
// USING LODASH-ES METHOD IN NUXT.CONFIG.TS CRASHES THE NUXT SERVER
// REMOVE THIS AND USE THE NORMAL NPM PACKAGE ONCE THIS IS FIXED

import { extendPages, defineNuxtModule } from '@nuxt/kit';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import prettier from 'prettier';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'pathe';
import mkdirp from 'mkdirp';

const camelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

const { resolveConfig, format } = prettier;
const defaultPrettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'strict'
};
async function formatOutputWithPrettier(template) {
  try {
    let prettierFoundOptions = await resolveConfig(process.cwd());
    if (!prettierFoundOptions) {
      prettierFoundOptions = defaultPrettierOptions;
    }
    const formatedTemplate = format(template, {
      ...prettierFoundOptions,
      parser: 'typescript'
    });
    return formatedTemplate;
  } catch (e) {
    console.error(
      logSymbols.error,
      chalk.red('Error while formatting the output'),
      '\n' + e
    );
    return Promise.reject(e);
  }
}

dirname(fileURLToPath(import.meta.url));
async function saveRouteFiles(outDir, srcDir, fileName, content) {
  try {
    const processedOutDir = resolve(srcDir, outDir);
    const outputFile = resolve(process.cwd(), `${processedOutDir}/${fileName}`);
    const formatedContent = await formatOutputWithPrettier(content);
    if (fs.existsSync(outputFile)) {
      await writeFile(outputFile, formatedContent);
    } else {
      const dirList = outputFile.split('/');
      dirList.pop();
      const dirPath = dirList.join('/');
      await mkdirp(dirPath);
      await writeFile(outputFile, formatedContent);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
async function writeFile(path, content) {
  try {
    await fs.writeFileSync(path, content);
  } catch (e) {
    console.log(
      logSymbols.error,
      chalk.red(`Error while saving file at ${path}`, e)
    );
    return Promise.reject(e);
  }
}

function extractMatchingSiblings(mainRoute, siblingRoutes) {
  return siblingRoutes?.filter(s => {
    const chunkName = extractChunkMain(mainRoute.file);
    if (chunkName && s.name) {
      const siblingChunkName = extractChunkMain(s.file);
      if (!siblingChunkName) return false;
      return chunkName === siblingChunkName;
    }
    return false;
  });
}
function extractUnMatchingSiblings(mainRoute, siblingRoutes) {
  return siblingRoutes?.filter(s => {
    const chunkName = extractChunkMain(mainRoute.file);
    if (chunkName) {
      const siblingChunkName = extractChunkMain(s.file);
      if (!siblingChunkName) return false;
      return chunkName !== siblingChunkName;
    }
    return false;
  });
}
function extractChunkMain(chunkName) {
  const chunkArray = chunkName?.split('/');
  return chunkArray?.join('/');
}

const routeParamExtractRegxp = /:(\w+)/;
function extractRouteParamsFromPath(path, previousParams) {
  const params = path.match(routeParamExtractRegxp) ?? [];
  params?.shift();
  let allMergedParams = params.map(m => ({
    key: m,
    type: 'string | number',
    required: true
  }));
  if (previousParams?.length) {
    allMergedParams = allMergedParams.concat(
      previousParams.map(m => ({ ...m, required: false }))
    );
  }
  return allMergedParams;
}

function isItemLast(array, index) {
  return index === array.length - 1;
}
function constructRouteMap(routesConfig) {
  try {
    const routesObjectTemplate = '{';
    const routesDeclTemplate = '{';
    const routesList = [];
    const routesParams = [];
    const output = {
      routesObjectTemplate,
      routesDeclTemplate,
      routesList,
      routesParams
    };
    startGeneratorProcedure({
      output,
      routesConfig
    });
    return output;
  } catch (e) {
    throw new Error('Generation failed');
  }
}
function startGeneratorProcedure({ output, routesConfig }) {
  routesConfig.forEach((route, index) => {
    const rootSiblingsRoutes = routesConfig.filter(
      rt => rt.chunkName !== route.chunkName
    );
    // @ts-ignore
    walkThoughRoutes({
      route,
      level: 0,
      output,
      siblings: rootSiblingsRoutes,
      isLast: isItemLast(routesConfig, index)
    });
  });
  output.routesObjectTemplate += '}';
  output.routesDeclTemplate += '}';
}
function walkThoughRoutes({
  route,
  level,
  siblings,
  parentName,
  previousParams,
  output,
  isLast
}) {
  const matchingSiblings = extractMatchingSiblings(route, siblings);
  const haveMatchingSiblings = !!matchingSiblings?.length && route.path !== '/';
  const chunkArray = route.file?.split('/') ?? [];
  const lastChunkArray = chunkArray[chunkArray?.length - 1].split('.vue')[0];
  const isRootSibling = lastChunkArray === 'index';
  if (
    (route.children?.length && !haveMatchingSiblings) ||
    (!route.children?.length && haveMatchingSiblings && isRootSibling)
  ) {
    const childrenChunks = haveMatchingSiblings
      ? matchingSiblings
      : route.children;
    const splittedPaths = route.path.split('/');
    const parentPath = splittedPaths[splittedPaths.length - 1];
    const nameKey = camelCase(parentPath || 'index');
    output.routesObjectTemplate += `${nameKey}:{`;
    output.routesDeclTemplate += `"${nameKey}":{`;
    const allRouteParams = extractRouteParamsFromPath(
      route.path,
      previousParams
    );
    childrenChunks?.map((routeConfig, index) =>
      walkThoughRoutes({
        route: routeConfig,
        level: level + 1,
        siblings: extractUnMatchingSiblings(route, siblings),
        parentName: nameKey,
        previousParams: allRouteParams,
        output,
        isLast: isItemLast(childrenChunks, index)
      })
    );
    output.routesObjectTemplate += '},';
    output.routesDeclTemplate += `}${isLast ? '' : ','}`;
  } else if (route.name) {
    let splitted = [];
    splitted = route.name.split('-');
    splitted = splitted.slice(level, splitted.length);
    if (splitted[0] === parentName) {
      splitted.splice(0, 1);
    }
    const keyName =
      route.path === '' ? 'index' : camelCase(splitted.join('-')) || 'index';
    output.routesObjectTemplate += `'${keyName}': '${route.name}' as const,`;
    output.routesDeclTemplate += `"${keyName}": "${route.name}"${
      isLast ? '' : ','
    }`;
    output.routesList.push(route.name);
    const allRouteParams = extractRouteParamsFromPath(
      route.path,
      previousParams
    );
    output.routesParams.push({
      name: route.name,
      params: allRouteParams
    });
  }
}

const signatureTemplate = `/** 
  * ---------------------
  * \u{1F697}\u{1F6A6} Generated by nuxt-typed-router. Do not modify !
  * ---------------------
  * */
 
`;
const staticDeclImports = `
import type {
  NavigationFailure,
  RouteLocation,
  RouteLocationNormalizedLoaded,
  RouteLocationOptions,
  RouteQueryAndHash,
} from 'vue-router';
import type { TypedRouteList } from './__routes'
`;
const staticDeclarations = `
  type TypedRouteParamsStructure = {
    [K in TypedRouteList]: Record<string, string | number> | never;
  };
  
  type TypedLocationAsRelativeRaw<T extends TypedRouteList> = {
    name?: T;
    params?: TypedRouteParams[T];
  };
  
  type TypedRouteLocationRaw<T extends TypedRouteList> = RouteQueryAndHash &
    TypedLocationAsRelativeRaw<T> &
    RouteLocationOptions;
  
  export interface TypedRouter {
    /**
     * Remove an existing route by its name.
     *
     * @param name - Name of the route to remove
     */
    removeRoute(name: TypedRouteList): void;
    /**
     * Checks if a route with a given name exists
     *
     * @param name - Name of the route to check
     */
    hasRoute(name: TypedRouteList): boolean;
    /**
     * Returns the {@link RouteLocation | normalized version} of a
     * {@link RouteLocationRaw | route location}. Also includes an \`href\` property
     * that includes any existing \`base\`. By default the \`currentLocation\` used is
     * \`route.currentRoute\` and should only be overriden in advanced use cases.
     *
     * @param to - Raw route location to resolve
     * @param currentLocation - Optional current location to resolve against
     */
    resolve<T extends TypedRouteList>(
      to: TypedRouteLocationRaw<T>,
      currentLocation?: RouteLocationNormalizedLoaded
    ): RouteLocation & {
      href: string;
    };
    /**
     * Programmatically navigate to a new URL by pushing an entry in the history
     * stack.
     *
     * @param to - Route location to navigate to
     */
    push<T extends TypedRouteList>(
      to: TypedRouteLocationRaw<T>
    ): Promise<NavigationFailure | void | undefined>;
    /**
     * Programmatically navigate to a new URL by replacing the current entry in
     * the history stack.
     *
     * @param to - Route location to navigate to
     */
    replace<T extends TypedRouteList>(
      to: TypedRouteLocationRaw<T>
    ): Promise<NavigationFailure | void | undefined>;
  }
  
  declare module 'nuxt3/dist/app/nuxt' {
    export interface NuxtApp {
      $typedRouter: TypedRouter;
      $routesList: RouteListDecl;
    }
  }

  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $typedRouter: TypedRouter;
      $routesList: RouteListDecl;
    }
  }
  `;

function createRuntimePluginFile(routesDeclTemplate) {
  return `
  ${signatureTemplate}
  import { defineNuxtPlugin } from '#app';

  export default defineNuxtPlugin((nuxtApp) => {
    const routesList = ${routesDeclTemplate};

    return {
      provide: {
        typedRouter: nuxtApp.$router,
        routesList,
      },
    };
  });
  `;
}
function createRuntimeHookFile(routesDeclTemplate) {
  return `
  ${signatureTemplate}
  import { useNuxtApp } from '#app';
  import { TypedRouter, RouteListDecl } from './typed-router';

  /** Returns instances of $typedRouter and $routesList fully typed to use in your components or your Vuex/Pinia store
   * 
   * @exemple
   * 
   * \`\`\`ts
   * const { router, routes } = useTypedRouter();
   * \`\`\`
   */
  export const useTypedRouter = (): {
    /** Export of $router with type check */
    router: TypedRouter,
    /** Contains a typed dictionnary of all your route names (for syntax sugar) */
    routes: RouteListDecl
  } => {
    const { $router } = useNuxtApp();

    const routesList = ${routesDeclTemplate};

    return {
      router: $router,
      routes: routesList,
    } as any;
  };

  `;
}
function createRuntimeIndexFile() {
  return `
  ${signatureTemplate}
  export * from './__routes';
  export * from './__useTypedRouter';
  `;
}
function createRuntimeRoutesFile({
  routesList,
  routesObjectTemplate,
  routesObjectName
}) {
  return `
    ${signatureTemplate}

    export const ${routesObjectName} = ${routesObjectTemplate};

    ${createTypedRouteListExport(routesList)}
  `;
}
function createDeclarationRoutesFile({
  routesDeclTemplate,
  routesList,
  routesParams
}) {
  return `
    ${signatureTemplate}
    ${staticDeclImports}

    export type RouteListDecl = ${routesDeclTemplate};

    ${createTypedRouteParamsExport(routesParams)}

    ${staticDeclarations}
  `;
}
function createTypedRouteListExport(routesList) {
  return `export type TypedRouteList = ${routesList
    .map(m => `'${m}'`)
    .join('|\n')}`;
}
function createTypedRouteParamsExport(routesParams) {
  return `export type TypedRouteParams = {
    ${routesParams
      .map(
        ({ name, params }) =>
          `"${name}": ${
            params.length
              ? `{
          ${params
            .map(
              ({ key, required, type }) =>
                `"${key}"${required ? '' : '?'}: ${type}`
            )
            .join(',\n')}
        }`
              : 'never'
          }`
      )
      .join(',\n')}
  }`;
}

function routeHook(outDir, routesObjectName, srcDir, nuxt) {
  try {
    extendPages(async routes => {
      if (routes.length) {
        const {
          routesDeclTemplate,
          routesList,
          routesObjectTemplate,
          routesParams
        } = constructRouteMap(routes);
        const pluginName = '__typed-router.ts';
        nuxt.hook('build:done', async () => {
          const pluginFolder = `${srcDir}/plugins`;
          await saveRouteFiles(
            pluginFolder,
            srcDir,
            pluginName,
            createRuntimePluginFile(routesDeclTemplate)
          );
        });
        await Promise.all([
          saveRouteFiles(
            outDir,
            srcDir,
            '__useTypedRouter.ts',
            createRuntimeHookFile(routesDeclTemplate)
          ),
          saveRouteFiles(
            outDir,
            srcDir,
            `__routes.ts`,
            createRuntimeRoutesFile({
              routesList,
              routesObjectTemplate,
              routesObjectName
            })
          ),
          saveRouteFiles(
            outDir,
            srcDir,
            `typed-router.d.ts`,
            createDeclarationRoutesFile({
              routesDeclTemplate,
              routesList,
              routesParams
            })
          ),
          saveRouteFiles(outDir, srcDir, 'index.ts', createRuntimeIndexFile())
        ]);
        console.log(
          logSymbols.success,
          `[typed-router] Routes definitions generated`
        );
      } else {
        console.log(
          logSymbols.warning,
          chalk.yellow(
            `[typed-router] No routes defined. Check if your ${chalk.underline(
              chalk.bold('pages')
            )} folder exists and remove ${chalk.underline(
              chalk.bold('app.vue')
            )}`
          )
        );
      }
    });
  } catch (e) {
    console.error(
      chalk.red('Error while generating routes definitions model'),
      '\n' + e
    );
  }
}

const module = defineNuxtModule({
  meta: {
    name: 'nuxt-typed-router',
    configKey: 'nuxtTypedRouter',
    compatibility: { nuxt: '^3.0.0', bridge: false }
  },
  setup(moduleOptions, nuxt) {
    const srcDir = nuxt.options.srcDir;
    const { outDir = `./generated`, routesObjectName = 'routerPagesNames' } =
      moduleOptions;
    nuxt.hook('pages:extend', () =>
      routeHook(outDir, routesObjectName, srcDir, nuxt)
    );
    routeHook(outDir, routesObjectName, srcDir, nuxt);
  }
});

export { module as default };
