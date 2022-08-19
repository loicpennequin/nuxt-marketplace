<script lang="ts" setup>
import { vClickOutside } from '../../directives/click-outside';
import { useModal } from '../../composables/useModal';
import { KEYBOARD } from '@/features/app/utils/constants';
import { Maybe } from '@/features/app/utils';
import { getFocusableChildren } from '../../utils/domUtils';

const { isOpened, close } = useModal();

useEventListener('keydown', (e: KeyboardEvent) => {
  switch (e.key) {
    case KEYBOARD.ESCAPE:
      return close();
    default:
      return;
  }
});

const triggerRef = ref<Maybe<HTMLElement>>(null);
const contentRef = ref<Maybe<HTMLElement>>(null);
const focusRef = ref<Maybe<HTMLElement>>(null);

const onModalOpen = () => {
  triggerRef.value = document.activeElement as HTMLElement;
  nextTick(() => {
    const children = getFocusableChildren(contentRef.value);
    const elementToFocus = focusRef.value ?? children[0];
    (elementToFocus as Maybe<HTMLElement>)?.focus();
  });
};
const onModalClose = () => {
  triggerRef.value?.focus();
};

watch(isOpened, async isOpened => {
  isOpened ? onModalOpen() : onModalClose();
});

const slotProps = computed(() => ({
  focusRef: (el: HTMLElement) => {
    focusRef.value = el;
  }
}));
</script>

<template>
  <div
    v-if="isOpened"
    ref="contentRef"
    v-click-outside="close"
    fixed
    flex
    inset-0
    items-start
    justify-center
    z-30
  >
    <UiSurface max-w="screen-md" mt-6>
      <slot v-bind="slotProps" />
    </UiSurface>
  </div>
</template>
