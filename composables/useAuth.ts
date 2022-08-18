export const useAuth = () => {
  const headers = useClientHeaders();
  const { jwt } = useJwt();

  if (jwt.value) {
    headers.value.Authorization = `Bearer ${jwt.value}`;
  }

  const loginMutation = useTrpcMutation('auth.login', {
    onSuccess(data) {
      jwt.value = data.accessToken;
      headers.value.Authorization = `Bearer ${jwt.value}`;
    }
  });

  const refreshTokenMutation = useTrpcMutation('auth.refreshToken', {
    onSuccess(data) {
      jwt.value = data.accessToken;
      headers.value.Authorization = `Bearer ${jwt.value}`;
    }
  });

  const logoutMutation = useTrpcMutation('auth.logout', {
    onSuccess() {
      jwt.value = undefined;
      delete headers.value.Authorization;
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
