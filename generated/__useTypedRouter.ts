/**
 * ---------------------
 * 🚗🚦 Generated by nuxt-typed-router. Do not modify !
 * ---------------------
 * */

import { useNuxtApp } from '#app';
import { TypedRouter, RouteListDecl } from './typed-router';

/** Returns instances of $typedRouter and $routesList fully typed to use in your components or your Vuex/Pinia store
 *
 * @exemple
 *
 * ```ts
 * const { router, routes } = useTypedRouter();
 * ```
 */
export const useTypedRouter = (): {
  /** Export of $router with type check */
  router: TypedRouter;
  /** Contains a typed dictionnary of all your route names (for syntax sugar) */
  routes: RouteListDecl;
} => {
  const { $router } = useNuxtApp();

  const routesList = { index: 'index', login: 'login' };

  return {
    router: $router,
    routes: routesList
  } as any;
};
