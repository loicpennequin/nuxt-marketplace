import { appendHeader } from 'h3';

export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.env.SSR) return;
  try {
    console.log('=======================================');
    const { jwt } = useJwt();
    const res: any = await $fetch.raw('/api/trpc/auth.refreshToken', {
      method: 'POST',
      headers: useRequestHeaders(['cookie']) as Record<string, string>
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
