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
    theme: {
      colors: {
        brand: {
          '1': '#c1e8de',
          '2': '#89d4c1',
          '3': '#3fb99a',
          '4': '#21a785',
          '5': '#1c8d70',
          '6': '#17775e',
          '7': '#13604c',
          '8': '#105140',
          '9': '#0b3a2e',
          '100': '#c1e8de',
          '200': '#89d4c1',
          '300': '#3fb99a',
          '400': '#21a785',
          '500': '#1c8d70',
          '600': '#17775e',
          '700': '#13604c',
          '800': '#105140',
          '900': '#0b3a2e'
        }
      }
    },
    presets: [
      presetAttributify(),
      presetWind(),
      presetIcons({
        collections: {
          ui: FileSystemIconLoader('./public/icons', svg => {
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
