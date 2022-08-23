<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <UiContainer>
    <UiSurface text-center>
      <h2 m-b-5 text-xl font-bold>
        {{ t('title') }}
      </h2>
      {{ t('message') }}
    </UiSurface>
  </UiContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Almost there !",
    "message": "A confirmation email has been sent. Please click on the link inside it to verify your account and log in to your account."
  }
}
</i18n>
