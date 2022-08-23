import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
import offset from '@popperjs/core/lib/modifiers/offset';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import { Instance, Placement } from '@popperjs/core';
import { Maybe, MaybeRef } from '~~/utils/types';

const toInt = (x: string | number) => parseInt(`${x}`, 10);

export type UsePopperOptions = {
  triggerNode: Maybe<Element>;
  popperNode: Maybe<HTMLElement>;
  placement: Placement;
  locked: boolean;
  offsetSkid: string | number;
  offsetDistance: string | number;
  arrowPadding: string | number;
};

export default function usePopper(
  emit: (name: 'close:popper' | 'open:popper', ...args: any[]) => void,
  options: MaybeRef<UsePopperOptions>
) {
  const state = reactive<{ isOpen: boolean; popperInstance: Maybe<Instance> }>({
    isOpen: false,
    popperInstance: null
  });

  const setPopperEventListeners = (enabled: boolean) => {
    state.popperInstance?.setOptions(popperOptions => ({
      ...popperOptions,
      modifiers: [
        ...(popperOptions.modifiers || []),
        { name: 'eventListeners', enabled }
      ]
    }));
  };

  const enablePopperEventListeners = () => setPopperEventListeners(true);
  const disablePopperEventListeners = () => setPopperEventListeners(false);

  const close = () => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit('close:popper');
  };

  const open = () => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit('open:popper');
  };

  // When isOpen or placement change
  watch(
    [() => state.isOpen, () => unref(options).placement],
    async ([isOpen]) => {
      if (isOpen) {
        await initializePopper();
        enablePopperEventListeners();
      } else {
        disablePopperEventListeners();
      }
    }
  );

  const initializePopper = async () => {
    await nextTick();
    const {
      arrowPadding,
      locked,
      offsetDistance,
      offsetSkid,
      placement,
      popperNode,
      triggerNode
    } = unref(options);

    if (!triggerNode || !popperNode) return;

    state.popperInstance = createPopper(triggerNode, popperNode, {
      placement: placement,
      modifiers: [
        preventOverflow,
        flip,
        {
          name: 'flip',
          enabled: !locked
        },
        arrow,
        {
          name: 'arrow',
          options: {
            padding: toInt(arrowPadding)
          }
        },
        offset,
        {
          name: 'offset',
          options: {
            offset: [toInt(offsetSkid), toInt(offsetDistance)]
          }
        }
      ]
    });

    // Update its position
    state.popperInstance.update();
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state),
    open,
    close
  };
}
