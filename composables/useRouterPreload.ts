export const useRouterPreload = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isPreloading = ref(false);
  router.beforeEach(async (to, from, next) => {
    if (!from.name) return next();
    isPreloading.value = true;

    await Promise.all(
      to.matched.map(match => match.meta.loader?.preload(to, queryClient))
    );

    next();
    isPreloading.value = false;
  });

  return isPreloading;
};
