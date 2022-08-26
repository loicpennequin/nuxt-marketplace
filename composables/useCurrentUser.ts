export const useCurrentUser = () => {
  const { jwt } = useJwt();
  const opts = computed(() => ({
    enabled: !!jwt.value,
    staleTime: 0
  }));

  const query = useTrpcQuery(['user.me'], opts);

  return {
    ...query,
    suspense() {
      if (!jwt.value) return;
      return query.suspense();
    }
  };
};
