<script lang="ts" setup>
const { isOpened, close } = useModal();
</script>

<template>
  <div
    v-if="isOpened"
    bg-black
    bg-opacity-50
    fixed
    inset-0
    z-20
    @click="close"
  />
</template>
