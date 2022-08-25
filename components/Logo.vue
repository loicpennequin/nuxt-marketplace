<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <NuxtLink :to="{ name: routes.index }" block flex items-center aspect="60/23">
    <img
      class="app-logo"
      src="/logo.svg"
      w-full
      h-full
      alt="Daria logo"
      width="60"
      height="23"
    />
    <img
      class="app-logo--dark-mode"
      src="/logo-light.svg"
      w-full
      h-full
      alt="Daria logo"
      width="60"
      height="23"
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
