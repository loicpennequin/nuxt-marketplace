<script setup lang="ts">
const { t } = useI18n();
const { data: currentUser } = useCurrentUser();
</script>

<template>
  <UiCenter>
    <UiContainer max-w="screen-md">
      <UiSurface p="15">
        <h2 m-b-5 text-2xl font-bold color="brand-600 dark:brand-400">
          {{ t('title', { user: currentUser?.username }) }}
        </h2>
        {{ t('message') }}
      </UiSurface>
    </UiContainer>
  </UiCenter>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Welcome, {user} !",
    "message": "You account has been verified successfully. You can now use all of Daria's services."
  },
  "fr": {
    "title": "Bienvenue, {user} !",
    "message": "Votre compte a été validé. Vous pouvez désormais utiliser tous les services Daria."
  }
}
</i18n>
