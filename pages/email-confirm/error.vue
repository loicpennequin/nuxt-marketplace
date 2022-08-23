<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UiContainer>
    <UiSurface text-center>{{ t('message') }}</UiSurface>
  </UiContainer>
</template>

<i18n lang="json">
{ "en": { "message": "An error occured whil verifying your email address." } }
</i18n>
