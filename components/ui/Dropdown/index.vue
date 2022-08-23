<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { getFocusableChildren } from '~~/utils/helpers/dom';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const toggleContainerNode = ref<HTMLElement>();
const isOpened = useVModel(props, 'modelValue', emit);

const { close, toggleNode, toggle } = useDropdownProvider(isOpened);

watchEffect(() => {
  toggleNode.value = getFocusableChildren(toggleContainerNode.value)[0];
});
</script>

<template>
  <div v-on-click-outside="close">
    <div ref="toggleContainerNode">
      <slot name="toggle" :on="{ click: toggle }" />
    </div>
    <UiDropdownMenu ref="popperNode">
      <!-- <slot name="menu" /> -->
      <slot name="menu" />
    </UiDropdownMenu>
  </div>
</template>
