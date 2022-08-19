<script lang="ts" setup>
const { close } = useModal();
</script>

<template>
  <button
    aria-label="close modal"
    aspect-square
    bg-red-100
    cursor-pointer
    i-ui-close
    p-4
    @click.stop="close"
  />
</template>
