import { LoginDto } from '~~/dtos/auth.dto';

export const useAuth = () => {
  const { jwt } = useJwt();
  const http = useHttp();

  const loginMutation = useMutation(
    ['login'],
    (dto: LoginDto) =>
      http.post('/api/auth/login', {
        method: 'post',
        body: dto
      }),
    {
      onSuccess(data) {
        jwt.value = data.accessToken;
      }
    }
  );

  const refreshTokenMutation = useMutation(
    ['refreshToken'],
    () => http.post('/api/auth/refresh'),
    {
      onSuccess(data) {
        jwt.value = data.accessToken;
      }
    }
  );

  return {
    login: loginMutation.mutate,
    loginMutation,
    refreshToken: refreshTokenMutation.mutate,
    refreshTokenMutation
  };
};
