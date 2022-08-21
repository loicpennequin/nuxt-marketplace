<script setup lang="ts">
const props = defineProps<{ error?: string }>();
</script>
<template>
  <transition appear>
    <div color="red-7 dark:red-4" flex items-center h-4 gap-2>
      <div h-full aspect-square i-ui-warning-sign />
      {{ props.error }}
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  --at-apply: 'transition-opacity duration-300';
}
.v-enter-from,
.v-leave-to {
  --at-apply: 'opacity-0 ';
}
</style>
