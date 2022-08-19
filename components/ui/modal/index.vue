<script lang="ts" setup>
import { provide, toRef } from 'vue';
import { createTeleportHost } from '../../utils/vueUtils';
import { useBodyScrollLock } from '../../composables/useBodyScrollLock';
import { MODAL_INJECTION_KEY, MODAL_TELEPORT_HOST } from '../../constants';
import { ModalContext } from '../../types/modal';

interface Props {
  isOpened: boolean;
  isScrollInside?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isScrollInside: true
});

const emit = defineEmits<{
  (e: 'update:isOpened', value: boolean): void;
}>();

createTeleportHost(MODAL_TELEPORT_HOST);

useBodyScrollLock(toRef(props, 'isOpened'));

const modal: ModalContext = {
  isOpened: toRef(props, 'isOpened'),
  isScrollInside: toRef(props, 'isScrollInside'),
  close: () => emit('update:isOpened', false),
  toggle: () => emit('update:isOpened', !props.isOpened),
  open: () => emit('update:isOpened', true)
};

const onKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Escape') modal.close();
};
useEventListener('keyup', onKeyUp);
provide(MODAL_INJECTION_KEY, modal);
</script>

<template>
  <teleport :to="`#${MODAL_TELEPORT_HOST}`">
    <slot v-bind="modal" />
  </teleport>
</template>
