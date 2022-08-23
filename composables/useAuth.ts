import { InferMutationOptions } from './trpc';

export const useAuth = () => {
  const { jwt, decodedJwt } = useJwt();

  const loginMutation = (options: InferMutationOptions<'auth.login'> = {}) =>
    useTrpcMutation('auth.login', {
      ...options,
      onSuccess(data, variables, context) {
        jwt.value = data.accessToken;
        options?.onSuccess?.(data, variables, context);
      }
    });

  const refreshTokenMutation = (
    options: InferMutationOptions<'auth.refreshToken'> = {}
  ) =>
    useTrpcMutation('auth.refreshToken', {
      ...options,
      onSuccess(data, variables, context) {
        jwt.value = data.accessToken;
        options?.onSuccess?.(data, variables, context);
      }
    });

  const logoutMutation = (options: InferMutationOptions<'auth.logout'> = {}) =>
    useTrpcMutation('auth.logout', {
      ...options,
      onSuccess(data, variables, context) {
        jwt.value = undefined;
        options?.onSuccess?.(data, variables, context);
      }
    });

  const getWatchers = () => {
    const headers = useClientHeaders();

    const setHeader = () => {
      if (jwt.value) {
        headers.value.authorization = `Bearer ${jwt.value}`;
      } else {
        delete headers.value.authorization;
      }
    };

    const { refreshTokenMutation } = useAuth();
    const { mutate: refreshToken } = refreshTokenMutation();

    let refreshTimeout: any = undefined;
    const startRefreshTimeout = () => {
      if (import.meta.env.SSR) return;
      clearTimeout(refreshTimeout as number);
      if (!decodedJwt.value) return;

      const { exp } = decodedJwt.value;
      const expirationTimeout = exp * 1000 - new Date().getTime();
      refreshTimeout = setTimeout(() => {
        refreshToken(undefined);
      }, expirationTimeout - 30_000); // refresh token 30 secondes before it expores
    };

    watch(
      jwt,
      () => {
        startRefreshTimeout();
        setHeader();
      },
      { immediate: true }
    );
  };

  return {
    isLoggedIn: computed(() => !!jwt.value),
    loginMutation,
    refreshTokenMutation,
    logoutMutation,
    getWatchers
  };
};
