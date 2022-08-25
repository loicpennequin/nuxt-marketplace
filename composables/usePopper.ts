import { createPopper } from '@popperjs/core/lib/popper-lite.js';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
import offset from '@popperjs/core/lib/modifiers/offset';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import { Instance, Placement } from '@popperjs/core';
import { Maybe, MaybeRef } from '~~/utils/types';
import { Ref } from 'vue';

const toInt = (x: string | number) => parseInt(`${x}`, 10);

export type UsePopperOptions = {
  triggerNode: Maybe<Element>;
  popperNode: Maybe<HTMLElement>;
  offsetSkid?: string | number;
  offsetDistance?: string | number;
  locked?: boolean;
  placement?: Placement;
  arrowPadding?: string | number;
};

export default function usePopper(
  isOpen: Ref<boolean>,
  options: MaybeRef<UsePopperOptions>
) {
  const state = reactive<{ popperInstance: Maybe<Instance> }>({
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

  watch([isOpen, () => unref(options).placement], async ([isOpen]) => {
    if (isOpen) {
      await initializePopper();
      enablePopperEventListeners();
    } else {
      disablePopperEventListeners();
    }
  });

  const initializePopper = async () => {
    await nextTick();
    const {
      arrowPadding = 0,
      locked = false,
      offsetDistance = 10,
      offsetSkid = 0,
      placement = 'bottom',
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

    state.popperInstance.update();
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state)
  };
}
