<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UiCenter>
    <UiContainer max-w="screen-md">
      <UiSurface p="15">
        <h2 m-b-5 text-2xl font-bold color="red-600 dark:red-400">
          {{ t('title') }}
        </h2>
        {{ t('message') }}
      </UiSurface>
    </UiContainer>
  </UiCenter>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Email verification error",
    "message": "An error occured while verifying your email address."
  },
  "fr": {
    "title": "Erreur lors de la vérification de l'adresse",
    "message": "Votre addresse e-mail n'a pas pu être vérifiée."
  }
}
</i18n>
