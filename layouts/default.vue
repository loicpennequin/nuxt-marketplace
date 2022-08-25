<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <div min-h="screen" grid class="layout">
    <AppHeader />

    <main bg-light-6 dark:bg-dark-3 max-w-screen p-y-3>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  grid-template-rows: auto 1fr auto;
}
</style>
