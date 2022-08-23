<script setup lang="ts">
const { routes } = useTypedRouter();
const { t } = useI18n();
</script>

<template>
  <div flex gap-3 m-l-auto items-center>
    <NuxtLink :to="{ name: routes.login }">{{ t('login') }}</NuxtLink>
    <DarkModeToggle />
  </div>
</template>

<i18n lang="json">
{
  "en": { "login": "Login" }
}
</i18n>
