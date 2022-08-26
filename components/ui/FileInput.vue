<script setup lang="ts">
import { Maybe } from '~~/utils/types';

const props = defineProps<{
  modelValue: Maybe<Blob[]>;
  isLoading?: boolean;
  id?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const inputRef = ref<HTMLInputElement>();
const openFilePicker = async () => {
  inputRef.value?.click();
};

const onDrop = (files: File[] | null) => {
  if (!files) return;
  vModel.value = files;
};

const onInputChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  const result: Blob[] = [];
  for (let i = 0; i < files.length; i++) {
    result.push(files[i]);
  }
  vModel.value = result;
};

const { t } = useI18n();
const dropZoneRef = ref<HTMLElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<template>
  <div ref="dropZoneRef">
    <slot :open-file-picker="openFilePicker">
      <UiButton
        v-bind="isOverDropZone && { bg: 'brand-6' }"
        :id="props.id"
        left-icon="file-upload"
        type="button"
        :disabled="props.disabled"
        :is-loading="props.isLoading"
        @click="openFilePicker"
        @keyup.enter="openFilePicker"
      >
        {{ props.label ?? t('label') }}
      </UiButton>
    </slot>
    <input
      :id="props.id"
      ref="inputRef"
      type="file"
      sr-only
      :disabled="props.disabled"
      :multiple="props.multiple"
      :accept="props.accept"
      @change="onInputChange"
    />
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "label": "Select or drop a file"
  },
  "fr": {
    "label": "Sélectionner ou déposez un fichier"
  }
}
</i18n>
