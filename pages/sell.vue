<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});
const { t } = useI18n();
</script>

<template>
  <div flex items-center justify-center h-full>
    <UiContainer max-w="md">
      <UiSurface p="8">
        <h2 text-2xl font-bold m-b-8>{{ t('title') }}</h2>
        <ProductCreateForm />
      </UiSurface>
    </UiContainer>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Sell an item"
  },

  "fr": {
    "title": "Vendez votre article"
  }
}
</i18n>
