import { useTimeAgo as vueUseTimeAgo, UseTimeAgoMessages } from '@vueuse/core';
import { MaybeRef } from '~~/utils/types';

export const useTimeAgo = (time: MaybeRef<Date | number | string>) => {
  const { t } = useI18n({ useScope: 'global' });

  const messages: UseTimeAgoMessages = {
    justNow: t('timeAgo.justNow'),
    past: n => (n.match(/\d/) ? t('timeAgo.past', { n }) : n),
    future: n => (n.match(/\d/) ? t('timeAgo.future', { n }) : n),
    month: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastMonth')
          : t('timeAgo.nextMonth')
        : t('timeAgo.months', { n }),
    year: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastYear')
          : t('timeAgo.nextYear')
        : t('timeAgo.years', { n }),
    day: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastDay')
          : t('timeAgo.nextDay')
        : t('timeAgo.days', { n }),
    week: (n, past) =>
      n === 1
        ? past
          ? t('timeAgo.lastWeek')
          : t('timeAgo.nextWeek')
        : t('timeAgo.weeks', { n }),
    hour: n => t('timeAgo.hours', { n }),
    minute: n => t('timeAgo.minutes', { n }),
    second: n => t('timeAgo.seconds', { n })
  };

  return vueUseTimeAgo(time, {
    messages
  });
};
