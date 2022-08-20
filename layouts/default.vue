<script setup lang="ts">
const { data: currentUser, suspense } = useCurrentUser();
onServerPrefetch(suspense);

const { logout, isLoggedIn } = useAuth();
const onLogout = () => logout(null);
const { routes } = useTypedRouter();
</script>

<template>
  <div min-h="screen" grid class="layout">
    <UiSurface is="header" p="y-3 x-5" sticky top-0>
      <UiContainer flex>
        <h1 tracking-2 text-xl>
          <Logo />
        </h1>

        <div flex gap-3 m-l-auto items-center>
          <template v-if="!isLoggedIn">
            <NuxtLink :to="{ name: routes.login }">Login</NuxtLink>
          </template>

          <template v-else>
            <button
              aspect-square
              p-3
              h-10
              bg-brand-3
              flex
              justify-center
              items-center
              rounded="1/2"
              @click="onLogout"
            >
              {{ currentUser?.username.charAt(0) }}
            </button>
          </template>

          <DarkModeToggle />
        </div>
      </UiContainer>
    </UiSurface>

    <main bg-light-4 dark:bg-dark-3>
      <slot />
    </main>

    <UiSurface is="footer" p="8">
      <UiContainer flex justify-between flex-wrap>
        <div grow="1 sm:0" text-center m-b="8 sm:0">
          Created by
          <a underline href="https://enprojet.eu/yarilo/" target="_blank">
            Yarilo
          </a>
        </div>

        <div flex gap-5 flex-wrap text="children:center">
          <NuxtLink
            :to="{
              name: routes['cms-Page'],
              params: { page: 'termes-of-service' }
            }"
          >
            Terms of Service
          </NuxtLink>
          <NuxtLink
            :to="{
              name: routes['cms-Page'],
              params: { page: 'privacy-policy' }
            }"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            :to="{
              name: routes['cms-Page'],
              params: { page: 'cookies-policy' }
            }"
          >
            cookies
          </NuxtLink>

          <div grow="1 sm:0">© 2022 Yarilo, All rights reserved.</div>
        </div>
      </UiContainer>
    </UiSurface>
  </div>
</template>

<style scoped>
.layout {
  grid-template-rows: auto 1fr auto;
}
</style>
