export const useCurrentUser = () => {
  const { decodedJwt } = useJwt();
  const http = useHttp();

  return useQuery(
    ['currentUser'],
    () => http.get(`/api/users/${decodedJwt.value?.sub}`),
    { enabled: !!decodedJwt.value }
  );
};
