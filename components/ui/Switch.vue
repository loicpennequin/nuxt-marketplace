<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
  ariaLabel: string;
  id: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const vModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <div
    flex
    gap="2"
    items-center
    outline="3 solid transparent focus-within:brand-300"
    p="1"
    rounded="full"
    text-xs
  >
    <input
      v-model="vModel"
      :id="props.id"
      :aria-label="props.ariaLabel"
      sr-only
      type="checkbox"
    />
    <slot name="off" />
    <label
      border="solid 1 gray-400 dark:gray-500"
      cursor-pointer
      :for="props.id"
      h="5"
      p-x="1"
      relative
      rounded-full
      un-after="absolute top-0  w-4 h-4 rounded-full bg-brand-400  duration-200"
      w="10"
    />
    <slot name="on" />
  </div>
</template>

<style lang="scss" scoped>
label::after {
  content: '';
  margin-top: 1px;
  margin-left: 1px;
}

input[type='checkbox'] {
  &:not(:checked) {
    ~ label::after {
      left: 0;
    }
  }

  &:checked {
    ~ label::after {
      left: calc(100% - 18px);
    }
  }
}
</style>
