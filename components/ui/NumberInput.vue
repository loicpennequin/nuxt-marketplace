<script setup lang="ts">
import { Maybe } from '~~/utils/types';

const props = defineProps<{
  name: string;
  id: string;
  modelValue: Maybe<string>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <UiTextInput
    v-model.number="vModel"
    :id="props.id"
    :name="props.name"
    type="number"
  />
</template>

<i18n lang="json">
{
  "en": {
    "show": "Show password",
    "hide": "Hide password"
  },
  "fr": {
    "show": "Montrer le mot de passe",
    "hide": "Cacher le mot de passe"
  }
}
</i18n>
