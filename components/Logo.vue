<script setup lang="ts">
const colorMode = useColorMode();
const { routes } = useTypedRouter();
</script>

<template>
  <NuxtLink :to="{ name: routes.index }">
    <img
      class="app-logo"
      src="/logo.svg"
      h-full
      w-full
      alt="Yarilo logo"
      width="138"
      height="27"
    />
    <img
      class="app-logo--dark-mode"
      src="/logo-light.svg"
      h-full
      w-full
      alt="Yarilo logo"
      width="138"
      height="27"
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
