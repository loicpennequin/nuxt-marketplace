<script setup lang="ts">
const props = withDefaults(defineProps<{ colorScheme?: string }>(), {
  colorScheme: 'brand'
});

const bg = computed(() => `transparent hover:${props.colorScheme}-5`);
const color = computed(
  () => `${props.colorScheme}-5 dark:${props.colorScheme}-3`
);
</script>

<template>
  <UiButtonBase
    :bg="bg"
    bg-opacity="hover:10"
    :color="color"
    border="solid 1 currentColor"
  >
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>
