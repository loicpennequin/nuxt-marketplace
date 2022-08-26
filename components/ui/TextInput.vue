<script setup lang="ts">
import { Maybe } from '~~/utils/types';

const props = withDefaults(
  defineProps<{
    modelValue: Maybe<string>;
    name: string;
    type?: string;
    id: string;
    disabled?: boolean;
    leftIcon?: string;
    rightIcon?: string;
  }>(),
  { type: 'text', leftIcon: undefined, rightIcon: undefined }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);

const slots = useSlots();
</script>

<template>
  <div
    flex
    items-center
    gap="0"
    bg="light-2 dark:dark-3"
    border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
  >
    <div v-if="slots.left || props.leftIcon" m-l-2 self-stretch>
      <slot name="left">
        <div :i-ui="props.leftIcon" h-full aspect-square />
      </slot>
    </div>
    <input
      v-model="vModel"
      :id="props.id"
      :name="props.name"
      :type="props.type"
      flex-1
      bg-inherit
      color-inherit
      p="x-3 y-2"
      outline="focus:none"
    />

    <div v-if="slots.right || props.rightIcon" m-r-2 self-stretch>
      <slot name="right">
        <div :i-ui="props.rightIcon" h-full aspect-square />
      </slot>
    </div>
  </div>
</template>
