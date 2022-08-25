<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});
</script>

<template>
  <UiContainer sm="grid" gap-5 class="parameters">
    <UiSurface lt-sm="hidden">
      <div>Profile</div>
      <div>Account Information</div>
      <div>Delivery</div>
      <div>Payment</div>
    </UiSurface>
    <UiSurface>
      <NuxtPage />
    </UiSurface>
  </UiContainer>
</template>

<style scoped>
.parameters {
  grid-template-columns: minmax(20rem, auto) 1fr;
}
</style>
