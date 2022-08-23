import { Directive } from 'vue';
import { getFocusableChildren } from '~~/utils/helpers/dom';

export const vFocus: Directive = {
  mounted(el) {
    const [focusableChild] = getFocusableChildren(el);
    console.log(focusableChild, el);
    if (focusableChild) return focusableChild.focus();

    el.focus();
  },

  getSSRProps: () => ({})
};
