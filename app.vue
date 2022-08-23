<script setup lang="ts">
useHead({
  title: 'Daria',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'Second hand marketplace' }]
});

const { suspense } = useCurrentUser();
onServerPrefetch(suspense);

useAuth().getWatchers();
</script>

<template>
  <NuxtLayout color-black dark:color-white>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  --at-apply: 'bg-light-4 dark:bg-dark-3';
}
</style>
