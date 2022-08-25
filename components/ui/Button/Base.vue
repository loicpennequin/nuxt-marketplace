<script setup lang="ts">
import NuxtLink from '#app/components/nuxt-link';

interface Props {
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  leftIcon: '',
  rightIcon: '',
  isLoading: false
});
const slots = useSlots();

const attrs = useAttrs();
const is = computed(() => (attrs.to ? NuxtLink : 'button'));
</script>

<template>
  <component
    :is="is"
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
    outline="focus:none"
    ring="transparent focus-visible:brand-2 2"
    :disabled="isLoading || $attrs.disabled"
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
  </component>
</template>
