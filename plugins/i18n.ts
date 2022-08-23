import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import { z } from 'zod';
import { makeZodI18nMap } from '~~/utils/helpers/zod-errors';

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,

    fallbackWarn: false,
    missingWarn: false,
    locale: 'en',
    messages: {
      en
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
