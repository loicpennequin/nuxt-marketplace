<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{ name: string; id: string; label: string }>();
const { meta, errorMessage, value } = useField(toRef(props, 'name'));

const bind = computed(() => ({
  id: props.id,
  name: props.name,

  modelValue: value.value as any
}));

const on = {
  'update:modelValue'(val: any) {
    value.value = val;
  }
};

const { t } = useI18n();
</script>

<template>
  <div space-y-2>
    <label v-if="props.label" :for="props.id">{{ props.label }}</label>
    <slot :bind="bind" :on="on" />
    <UiFormError v-if="errorMessage && meta.touched" :error="t(errorMessage)" />
  </div>
</template>
