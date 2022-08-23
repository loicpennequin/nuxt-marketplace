<script setup lang="ts">
const { t, locale } = useI18n({ useScope: 'global' });
const availableLocales = ['en', 'fr'];
</script>

<template>
  <select v-model="locale" color-black>
    <option v-for="lang in availableLocales" :key="lang" :value="lang">
      {{ t(`languages.${lang}`) }}
    </option>
  </select>
</template>
