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

const isPasswordShown = ref(false);
const type = computed(() => (isPasswordShown.value ? 'text' : 'password'));

const { t } = useI18n();
</script>

<template>
  <UiTextInput v-model="vModel" :id="props.id" :name="props.name" :type="type">
    <template #right>
      <button
        type="button"
        h-full
        aspect-square
        :i-ui="isPasswordShown ? 'eye-slash' : 'eye'"
        :title="isPasswordShown ? t('hide') : t('show')"
        @click="isPasswordShown = !isPasswordShown"
      />
    </template>
  </UiTextInput>
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
