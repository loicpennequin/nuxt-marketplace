import { InjectionKey, Ref } from 'vue';
import { getFocusableChildren, KEYBOARD } from '~~/utils/helpers/dom';
import { Maybe } from '~~/utils/types';

export type DropdownContext = {
  isOpened: Ref<boolean>;
  toggleNode: Ref<Maybe<HTMLElement>>;
  menuNode: Ref<Maybe<HTMLElement>>;

  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const dropdownInjectionKey = Symbol(
  'dropdown'
) as InjectionKey<DropdownContext>;

export const useDropdownProvider = (isOpened: Ref<boolean>) => {
  const activeElement = useActiveElement();
  const toggleNode = ref<Maybe<HTMLElement>>(null);
  const menuNode = ref<Maybe<HTMLElement>>(null);

  usePopper(
    isOpened,
    computed(() => ({
      popperNode: unrefElement(menuNode),
      triggerNode: unref(toggleNode)
    }))
  );

  const isFocusInsideMenu = computed(
    () => activeElement.value && menuNode.value?.contains(activeElement.value)
  );

  const focusFirstMenuElement = () => {
    nextTick(() => {
      if (isFocusInsideMenu.value) return;

      getFocusableChildren(menuNode.value)[0]?.focus();
    });
  };

  const api = {
    isOpened,
    open: () => {
      if (isOpened.value) return;
      isOpened.value = true;
      focusFirstMenuElement();
    },
    close: () => {
      if (!isOpened.value) return;
      isOpened.value = false;
      toggleNode.value?.focus();
    },
    toggle: () => {
      isOpened.value = !isOpened.value;
      nextTick(() => {
        if (isOpened.value) focusFirstMenuElement();
      });
    },
    toggleNode,
    menuNode
  };

  if (!import.meta.env.SSR) {
    useEventListener(window, 'keydown', e => {
      switch (e.key) {
        case KEYBOARD.Escape:
          api.close();
      }
    });
  }
  provide(dropdownInjectionKey, api);

  return api;
};

export const useDropdown = () => useSafeInject(dropdownInjectionKey);
