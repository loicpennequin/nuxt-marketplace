import { appendHeader } from 'h3';

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.env.SSR) return;

  try {
    const { jwt } = useJwt();
    const res: any = await $fetch.raw('/trpc/refreshToken', {
      method: 'POST',
      // @ts-ignore
      headers: useRequestHeaders(['cookie'])
    });
    const cookies = (res.headers.get('set-cookie') || '').split(',');
    for (const cookie of cookies) {
      appendHeader(useRequestEvent(), 'set-cookie', cookie);
    }

    jwt.value = res._data.result.data?.accessToken as string;
  } catch (err) {
    console.error(err);
  }
});
