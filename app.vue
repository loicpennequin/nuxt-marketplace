<script setup lang="ts">
useHead({
  title: 'Daria Marketplace',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'Second hand marketplace' }]
});

const { suspense } = useCurrentUser();
onServerPrefetch(suspense);

useAuth().getWatchers();

const isPreloading = useRouterPreload();
</script>

<template>
  <NuxtLayout color-black dark:color-white>
    <UiSpinner
      v-if="isPreloading"
      fixed
      right="5"
      top="15"
      z-30
      w="10"
      h="10"
    />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  --at-apply: 'bg-light-4 dark:bg-dark-3';
}
</style>
