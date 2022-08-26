<script setup lang="ts">
const props = withDefaults(defineProps<{ colorScheme: string }>(), {
  colorScheme: 'brand'
});

const bg = computed(
  () => `${props.colorScheme}-5 hover:${props.colorScheme}-6`
);
</script>

<template>
  <UiButtonBase :bg="bg" color="white disabled:gray-4">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>
