<script setup lang="ts">
import { Field } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    name: string;
    type?: string;
    id: string;
    disabled?: boolean;
    leftIcon?: string;
    rightIcon?: string;
  }>(),
  { type: 'text', leftIcon: undefined, rightIcon: undefined }
);
</script>

<template>
  <div
    flex
    items-center
    gap="0"
    bg-light-3
    dark:bg-dark-3
    border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
  >
    <div v-if="$slots.left || props.leftIcon" m-l-2 self-stretch>
      <slot name="left">
        <div :i-ui="props.leftIcon" h-full aspect-square />
      </slot>
    </div>
    <Field
      :id="props.id"
      :name="props.name"
      :type="props.type"
      flex-1
      bg-inherit
      color-inherit
      p="x-3 y-2"
      outline="focus:none"
    />

    <div v-if="$slots.right || props.rightIcon" m-r-2 self-stretch>
      <slot name="right">
        <div :i-ui="props.rightIcon" h-full aspect-square />
      </slot>
    </div>
  </div>
</template>
