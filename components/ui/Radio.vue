<script setup lang="ts">
import { Maybe } from '~~/utils/types';

const props = defineProps<{
  modelValue: Maybe<string>;
  value: any;
  name: string;
  id: string;
  disabled?: boolean;
  label: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const isChecked = computed(() => props.value === props.modelValue);
</script>

<template>
  <label flex gap-2 items-center>
    <input
      v-model="vModel"
      :id="props.id"
      sr-only
      :name="props.name"
      type="radio"
      :value="value"
      un-focus="sibling:border-brand-3"
    />
    <div
      h-4
      aspect-square
      :i-ui="isChecked ? 'radio-filled' : 'radio-empty'"
      cursor-pointer
      border="solid 4"
    />
    {{ props.label }}
  </label>
</template>
