export const useCurrentUser = () => {
  const { decodedJwt } = useJwt();
  const opts = computed(() => ({
    enabled: !!decodedJwt.value
  }));

  const query = useTrpcQuery(
    computed(() => ['user.findById', decodedJwt.value?.sub]),
    opts
  );

  return {
    ...query,
    suspense() {
      if (!decodedJwt.value) return;
      return query.suspense();
    }
  };
};
