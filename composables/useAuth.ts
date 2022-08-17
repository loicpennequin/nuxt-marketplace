export const useAuth = () => {
  const headers = useClientHeaders();
  const { jwt } = useJwt();

  const loginMutation = useTrpcMutation('login', {
    onSuccess(data) {
      jwt.value = data.accessToken;
      headers.value.Authorization = `Bearer ${jwt.value}`;
    }
  });

  const refreshTokenMutation = useTrpcMutation('refreshToken', {
    onSuccess(data) {
      jwt.value = data.accessToken;
      headers.value.Authorization = `Bearer ${jwt.value}`;
    }
  });

  const logoutMutation = useTrpcMutation('logout', {
    onSuccess() {
      jwt.value = undefined;
    }
  });

  return {
    isLoggedIn: computed(() => !!jwt.value),
    login: loginMutation.mutate,
    loginMutation,
    refreshToken: refreshTokenMutation.mutate,
    refreshTokenMutation,
    logout: logoutMutation.mutate,
    logoutMutation
  };
};
