<script setup lang="ts">
import UiButtonFull from './full.vue';
import UiButtonOutlined from './outlined.vue';

type ButtonVariant = 'full' | 'outlined';

interface Props {
  variant?: ButtonVariant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full'
});

const variantMap = new Map<ButtonVariant, any>([
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
