<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UiCenter>
    <UiContainer max-w="screen-md">
      <UiSurface p="15">
        <h2 m-b-5 text-2xl font-bold>
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
    "title": "Almost there !",
    "message": "A confirmation email has been sent. Please click on the link inside it to verify your account and log in to the app."
  },
  "fr": {
    "title": "Vous y êtes presque !",
    "message": "Un e-mail de confirmation vous a été envoyé. Veuillez cliquer sur le lien qu'il contient pour valider la création de votre compt et vous connecter à l'zpplication."
  }
}
</i18n>
