<script setup lang="ts">
import usePopper from '~~/composables/usePopper';
import { vOnClickOutside } from '@vueuse/components';

const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();

const emit = defineEmits(['close:popper', 'open:popper']);

const options = computed(() => ({
  arrowPadding: 0,
  locked: false,
  offsetDistance: 12,
  offsetSkid: 0,
  placement: 'bottom',
  popperNode: unrefElement(popperNode),
  triggerNode: unref(triggerNode)
}));

const { open, close, isOpen } = usePopper(emit, options);

const toggle = () => (isOpen.value ? close() : open());
</script>

<template>
  <div v-on-click-outside="close">
    <div ref="triggerNode">
      <slot name="toggle" :on="{ click: toggle }" />
    </div>
    <ClientOnly>
      <UiSurface v-show="isOpen" ref="popperNode" p="2">
        <slot name="content" :close="close" :is-open="isOpen" />
      </UiSurface>
    </ClientOnly>
  </div>
</template>
