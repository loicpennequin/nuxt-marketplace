<script setup lang="ts">
const props = withDefaults(defineProps<{ is?: string }>(), {
  is: 'div'
});
</script>

<template>
  <component :is="props.is" bg="white dark:dark-100" color="inherit" p="5">
    <slot />
  </component>
</template>
