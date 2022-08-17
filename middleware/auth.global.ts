import { appendHeader } from 'h3';

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.env.SSR) return;
  const http = useHttp();
  const { jwt } = useJwt();

  try {
    const res = await http.raw('/api/auth/refresh', {
      method: 'post',
      // @ts-ignore
      headers: useRequestHeaders(['cookie'])
    });

    const cookies = (res.headers.get('set-cookie') || '').split(',');
    for (const cookie of cookies) {
      appendHeader(useRequestEvent(), 'set-cookie', cookie);
    }
    jwt.value = res._data?.accessToken as string;
  } catch (err) {
    console.error(err);
  }
});
