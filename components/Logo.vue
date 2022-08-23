<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <NuxtLink :to="{ name: routes.index }">
    <img
      class="app-logo"
      src="/logo.svg"
      h-full
      w-full
      alt="Daria logo"
      width="60"
      height="32"
      loading="lazy"
    />
    <img
      class="app-logo--dark-mode"
      src="/logo-light.svg"
      h-full
      w-full
      alt="Daria logo"
      width="60"
      height="32"
      loading="lazy"
    />
  </NuxtLink>
</template>

<style>
html.dark .app-logo {
  display: none;
}

html:not(.dark) .app-logo--dark-mode {
  display: none;
}
</style>
