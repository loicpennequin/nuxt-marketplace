import initUnocssRuntime from '@unocss/runtime';
import presetWind from '@unocss/preset-wind';
import presetAttributify from '@unocss/preset-attributify';
import { defineNuxtPlugin } from '#app';
// @ts-ignore
import presetIcons from '@unocss/preset-icons/browser';

const icons = [
  'arrows-left',
  'arrows-right',
  'bars',
  'check',
  'chevron-right',
  'close',
  'download',
  'eye',
  'eye-slash',
  'moon',
  'offline',
  'online',
  'spinner',
  'sun'
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
    console.log(uiIcons);
    initUnocssRuntime({
      defaults: {
        // @ts-ignore
        presets: [
          presetWind(),
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
