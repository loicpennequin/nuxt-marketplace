import { Ref } from 'vue';

export const useSubmitError = (error: Ref<any>) => {
  const { t, te } = useI18n();
  const { t: gt, te: gte } = useI18n({ useScope: 'global' });

  return computed(() => {
    if (!error.value) return '';

    const { httpStatus } = error.value.data;
    const { message } = error.value.shape;

    if (te(`errors.${httpStatus}`)) return t(`errors.${httpStatus}`);
    if (te(`errors.${message}`)) return t(`errors.${message}`);

    if (gte(`errors.${httpStatus}`)) return gt(`errors.${httpStatus}`);
    if (gte(`errors.${message}`)) return gt(`errors.${message}`);

    if (te(`errors.500`)) return t(`errors.500`);

    return gt(`errors.500`);
  });
};
