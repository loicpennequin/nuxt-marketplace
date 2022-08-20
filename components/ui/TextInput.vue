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
  <div flex gap="0" bg-light-3 dark:bg-dark-3 p-2>
    <slot name="left">
      <div v-if="props.leftIcon" :i-ui="props.leftIcon" w-5 h-5 />
    </slot>
    <Field
      :id="props.id"
      :name="props.name"
      :type="props.type"
      flex-1
      bg-transparent
      outline="focus:none"
    />

    <slot name="right">
      <div v-if="props.rightIcon" :i-ui="props.rightIcon" w-5 h-5 />
    </slot>
  </div>
</template>
