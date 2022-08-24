import { createPageLoader } from '@/utils/helpers/create-page-loader';

export const profileLoader = createPageLoader({
  user: route => ({
    key: ['user.findBySlug', route.params.slug as string],
    queryOptions: {},
    ssrPrefetch: true,
    waitPreloadBeforeNavigation: false
  })
});
