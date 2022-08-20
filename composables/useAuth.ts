import { InferMutationOptions } from './trpc';

export const useAuth = () => {
  const { jwt } = useJwt();

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

  return {
    isLoggedIn: computed(() => !!jwt.value),
    loginMutation,
    refreshTokenMutation,
    logoutMutation
  };
};
