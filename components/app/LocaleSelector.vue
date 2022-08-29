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
  <UiListBox v-model="vModel" :options="availableLocales" h="auto">
    <template #button>
      {{ t(`languages.${vModel}`) }}
    </template>

    <template #option="{ value: lang }">
      {{ t(`languages.${lang}`) }}
    </template>
  </UiListBox>
</template>
