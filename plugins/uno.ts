import initUnocssRuntime from '@unocss/runtime';
import presetWind from '@unocss/preset-wind';
import presetAttributify from '@unocss/preset-attributify';
import { defineNuxtPlugin } from '#app';
// @ts-ignore
import presetIcons from '@unocss/preset-icons/browser';

const icons = [
  'arrows-left',
  'arrows-right',
  'arrow-right-to-bracket',
  'bars',
  'brush',
  'check',
  'chevron-right',
  'clock',
  'close',
  'dots-vertical',
  'download',
  'eye-slash',
  'eye',
  'globe',
  'moon',
  'offline',
  'online',
  'power-off',
  'radio-empty',
  'radio-filled',
  'spinner',
  'sun',
  'user',
  'warning-sign'
];

export default defineNuxtPlugin(() => {
  if (process.client) {
    const uiIcons = Object.fromEntries(
      icons.map(icon => [
        icon,
        async () => {
          const response = await fetch(`/icons/${icon}.svg`);
          const svg = await response.text();
          return svg.replace('<svg ', '<svg fill="currentColor" ');
        }
      ])
    );

    initUnocssRuntime({
      defaults: {
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
        // @ts-ignore
        presets: [
          presetWind(presetWind()),
          presetAttributify(),
          presetIcons({
            collections: {
              ui: uiIcons
            }
          })
        ]
      }
    });
  }
});
