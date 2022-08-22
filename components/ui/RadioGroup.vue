<script setup lang="ts">
interface Props {
  modelValue: any;
  values: { label: string; value: any }[];
  id: string;
  name: string;
  disabled?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <fieldset flex gap-2>
    <UiRadio
      v-for="(value, index) in props.values"
      v-model="vModel"
      :id="props.id + index"
      :key="props.id + index"
      :label="value.label"
      :value="value.value"
      :name="props.name"
      :disabled="props.disabled"
    />
  </fieldset>
</template>
