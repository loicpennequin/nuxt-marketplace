<script setup lang="ts">
import { useSlots } from 'vue';

interface Props {
  isFullwidth?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFullwidth: false,
  leftIcon: '',
  rightIcon: '',
  isLoading: false
});
const slots = useSlots();
</script>

<template>
  <button
    cursor-pointer
    select-none
    no-underline
    whitespace-nowrap
    align-middle
    p="x-4 y-3"
    flex
    items-center
    justify-center
    font="bold"
    rounded
    bg="brand-5 hover:brand-6"
    color-white
    outline="focus:none"
    ring="transparent focus-visible:brand-2 2"
  >
    <div v-if="props.leftIcon || slots.left" m-r="2" :m-l="-1">
      <slot name="left">
        <div
          v-if="props.leftIcon"
          :i-ui="props.leftIcon"
          h-full
          aspect-square
        />
      </slot>
    </div>

    <UiSpinner v-if="isLoading" />
    <slot v-else />

    <div v-if="props.rightIcon || slots.right" m-l="2" :m-r="-1">
      <slot name="right">
        <div
          v-if="props.rightIcon"
          :i-ui="props.rightIcon"
          h-full
          aspect-square
        />
      </slot>
    </div>
  </button>
</template>
