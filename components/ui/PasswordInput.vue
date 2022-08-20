<script setup lang="ts">
const props = defineProps<{
  name: string;
  id: string;
}>();

const isPasswordShown = ref(false);
const type = computed(() => (isPasswordShown.value ? 'text' : 'password'));
</script>

<template>
  <UiTextInput :id="props.id" :name="props.name" :type="type">
    <template #right>
      <button
        type="button"
        h-full
        aspect-square
        :i-ui="isPasswordShown ? 'eye-slash' : 'eye'"
        @click="isPasswordShown = !isPasswordShown"
      />
    </template>
  </UiTextInput>
</template>
