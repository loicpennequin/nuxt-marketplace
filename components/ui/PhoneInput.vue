<script setup lang="ts">
import { Maybe } from '~~/utils/types';

const props = defineProps<{
  modelValue: Maybe<string>;
  name: string;
  id: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const onKeypress = (e: KeyboardEvent) => {
  if (!/^[0-9]+$/.test(e.key)) e.preventDefault();
};
</script>

<template>
  <input
    v-model="vModel"
    :id="props.id"
    bg="light-2 dark:dark-3"
    border="solid 1 light-9 dark:dark-9 focus-within:brand-4"
    pattern="[0-9]"
    p="x-3 y-2"
    outline="focus:none"
    type="tel"
    :name="props.name"
    :disabled="props.disabled"
    @keypress="onKeypress"
  />
</template>
