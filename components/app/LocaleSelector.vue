<script setup lang="ts">
const { t, locale } = useI18n({ useScope: 'global' });
const localeCookie = useCookie('locale');
const availableLocales = ['en', 'fr'];

const vModel = computed({
  get: () => locale.value,
  set: val => {
    locale.value = val;
    localeCookie.value = val as unknown as string;
  }
});
</script>

<template>
  <select
    v-model="vModel"
    color-black
    p-2
    bg-light-3
    dark:bg-dark-2
    color-inherit
  >
    <option v-for="lang in availableLocales" :key="lang" :value="lang">
      {{ t(`languages.${lang}`) }}
    </option>
  </select>
</template>
