<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UiContainer max-w="md">
    <UiSurface p="10">
      <h2 text-2xl font-bold m-b-5>{{ t('title') }}</h2>

      <UserUpdateProfileForm />
    </UiSurface>
  </UiContainer>
</template>

<i18n lang="json">
{
  "en": { "title": "Edit my profile" },
  "fr": { "title": "Modifier mon profil" }
}
</i18n>
