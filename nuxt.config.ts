import { defineNuxtConfig } from 'nuxt';
import transformerDirective from '@unocss/transformer-directives';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import presetIcons from '@unocss/preset-icons';
import presetWind from '@unocss/preset-wind';
import { presetAttributify } from 'unocss';

export default defineNuxtConfig({
  modules: [
    './modules/typedRouter',
    '@intlify/nuxt3',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@unocss/nuxt'
  ],

  intlify: {
    vueI18n: {
      locale: 'en',
      messages: {}
    }
  },

  unocss: {
    autoImport: true,
    preflight: true,
    presets: [
      presetAttributify(),
      presetWind(),
      presetIcons({
        collections: {
          ui: FileSystemIconLoader('./assets/icons', svg => {
            return svg.replace('<svg ', '<svg fill="currentColor" ');
          })
        }
      })
    ],
    transformers: [transformerDirective()]
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: ''
  },

  runtimeConfig: {
    jwtSecret: '',
    refreshTokenSecret: ''
  }
});
