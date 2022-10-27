<script setup lang="ts">
import { Component } from 'vue';
import UiButtonFull from './Full.vue';
import UiButtonOutlined from './Outlined.vue';

type ButtonVariant = 'full' | 'outlined';

interface Props {
  variant?: ButtonVariant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full'
});

const variantMap = new Map<ButtonVariant, Component>([
  ['full', UiButtonFull],
  ['outlined', UiButtonOutlined]
]);

const is = computed(() => variantMap.get(props.variant));
</script>

<template>
  <component :is="is">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="right" /></template>
  </component>
</template>
