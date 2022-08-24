import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import { z } from 'zod';
import { makeZodI18nMap } from '~~/utils/helpers/zod-errors';

const ACCEPT_LANGUAGE_REGEX =
  /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;
const DEFAULT_LOCALE = 'en';

const isDefined = <T>(x: T | undefined): x is T => x !== undefined;

const parseAcceptLanguageHeader = (al: string) => {
  const strings = (al || '').match(ACCEPT_LANGUAGE_REGEX);
  if (!strings) return [];

  return strings
    .map(m => {
      if (!m) {
        return;
      }

      const bits = m.split(';');
      const ietf = bits[0].split('-');
      const hasScript = ietf.length === 3;

      return {
        code: ietf[0],
        script: hasScript ? ietf[1] : null,
        region: hasScript ? ietf[2] : ietf[1],
        quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0
      };
    })
    .filter(isDefined)
    .sort((a, b) => b.quality - a.quality);
};

const pickDefaultLocaleSSR = (
  supportedLanguages: string[],
  acceptLanguage: string,
  options: Record<string, any> = {}
) => {
  if (!acceptLanguage) {
    return null;
  }

  const accepted = parseAcceptLanguageHeader(acceptLanguage);

  const supported = supportedLanguages.map(support => {
    const bits = support.split('-');
    const hasScript = bits.length === 3;

    return {
      code: bits[0],
      script: hasScript ? bits[1] : null,
      region: hasScript ? bits[2] : bits[1]
    };
  });

  for (let i = 0; i < accepted.length; i++) {
    const lang = accepted[i];
    const langCode = lang.code.toLowerCase();
    const langRegion = lang.region ? lang.region.toLowerCase() : lang.region;
    const langScript = lang.script ? lang.script.toLowerCase() : lang.script;
    for (let j = 0; j < supported.length; j++) {
      const supportedCode = supported[j].code.toLowerCase();
      const supportedScript = supported[j].script
        ? supported[j].script?.toLowerCase()
        : supported[j].script;
      const supportedRegion = supported[j].region
        ? supported[j].region.toLowerCase()
        : supported[j].region;
      if (
        langCode === supportedCode &&
        (options.loose || !langScript || langScript === supportedScript) &&
        (options.loose || !langRegion || langRegion === supportedRegion)
      ) {
        return supportedLanguages[j];
      }
    }
  }

  return null;
};

export default defineNuxtPlugin(({ vueApp, ssrContext }) => {
  const savedLocale = useCookie('locale');
  const defaultLocale = ssrContext
    ? pickDefaultLocaleSSR(
        ['en', 'fr'],
        ssrContext.event.req.headers['accept-language'] as string
      )
    : window.navigator.language.split('-')[0];

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,

    fallbackWarn: false,
    missingWarn: false,
    locale: savedLocale.value || defaultLocale || DEFAULT_LOCALE,
    messages: {
      en,
      fr
    }
  });

  z.setErrorMap(makeZodI18nMap(i18n.global.t as any));
  vueApp.use(i18n);

  return {
    provide: {
      i18n: i18n
    }
  };
});
