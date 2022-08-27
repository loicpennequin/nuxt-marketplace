<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UiContainer max-w="md">
    <UiSurface p="10">
      <h2 text-2xl font-bold m-b-5>{{ t('title') }}</h2>
      <UserUpdateAccountForm />
    </UiSurface>
  </UiContainer>
</template>

<i18n lang="json">
{
  "en": { "title": "My account" },
  "fr": { "title": "Mon compte" }
}
</i18n>
