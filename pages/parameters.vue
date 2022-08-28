<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});

const { routes } = useTypedRouter();
const { t } = useI18n();
</script>

<template>
  <UiContainer sm="grid" gap-5 class="parameters" h-full>
    <UiSurface lt-sm="hidden" flex flex-col gap-5>
      <UiLink :to="{ name: routes.parameters.profile }">
        {{ t('profile') }}
      </UiLink>
      <UiLink :to="{ name: routes.parameters.account }">
        {{ t('account') }}
      </UiLink>
    </UiSurface>

    <NuxtPage />
  </UiContainer>
</template>

<style scoped>
.parameters {
  grid-template-columns: minmax(20rem, auto) 1fr;
}
</style>

<i18n lang="json">
{
  "en": {
    "profile": "My profile",
    "account": "My account"
  },
  "fr": {
    "profile": "Mon profil",
    "account": "Mon compte"
  }
}
</i18n>
