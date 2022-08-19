export const useAuth = () => {
  const { jwt } = useJwt();

  const loginMutation = useTrpcMutation('auth.login', {
    onSuccess(data) {
      jwt.value = data.accessToken;
    }
  });

  const refreshTokenMutation = useTrpcMutation('auth.refreshToken', {
    onSuccess(data) {
      jwt.value = data.accessToken;
    }
  });

  const logoutMutation = useTrpcMutation('auth.logout', {
    onSuccess() {
      jwt.value = undefined;
    }
  });

  return {
    isLoggedIn: computed(() => !!jwt.value),
    login: loginMutation.mutateAsync,
    loginMutation,
    refreshToken: refreshTokenMutation.mutateAsync,
    refreshTokenMutation,
    logout: logoutMutation.mutateAsync,
    logoutMutation
  };
};
