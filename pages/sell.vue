<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});

const cloudinary = useCloudinary();
// console.log(cloudinary);
</script>

<template>
  <UiContainer>
    <UiSurface>Sell item page</UiSurface>
  </UiContainer>
</template>
