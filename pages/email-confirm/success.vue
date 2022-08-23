<script setup lang="ts">
const { t } = useI18n();
const { data: currentUser } = useCurrentUser();
</script>

<template>
  <UiContainer>
    <UiSurface text-center>
      <h2 m-b-5 text-xl font-bold>
        {{ t('title', { user: currentUser?.username }) }}
      </h2>
      {{ t('message') }}
    </UiSurface>
  </UiContainer>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Welcome, {user} !",
    "message": "You email has been verified successfully. You can now use all of Yarilo's services."
  }
}
</i18n>
