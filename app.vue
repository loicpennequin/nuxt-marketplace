<script setup lang="ts">
useHead({
  title: 'Yarilo',
  charset: 'utf-8',
  meta: [{ name: 'description', content: 'Second hand marketplace' }]
});

const headers = useClientHeaders();

const { jwt, decodedJwt } = useJwt();

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
    refreshToken(null);
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
</script>

<template>
  <NuxtLayout color-black dark:color-white>
    <NuxtPage />
  </NuxtLayout>
</template>
