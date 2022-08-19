<script setup lang="ts">
const { data: currentUser, suspense } = useCurrentUser();
onServerPrefetch(suspense);

const { logout, isLoggedIn } = useAuth();
const onLogout = () => logout(null);
const { routes } = useTypedRouter();
</script>

<template>
  <div min-h="screen" grid class="layout">
    <UiSurface is="header" flex p="y-3 x-5" sticky top-0>
      <NuxtLink :to="{ name: routes.index }">
        <h1>YARILO</h1>
      </NuxtLink>

      <div flex gap-3 m-l-auto items-center>
        <template v-if="!isLoggedIn">
          <NuxtLink :to="{ name: routes.login }">Login</NuxtLink>
        </template>

        <template v-else>
          <button
            aspect-square
            p-3
            h-10
            bg-blue-3
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
    </UiSurface>

    <main bg-light-4 dark:bg-dark-3>
      <slot />
    </main>

    <UiSurface is="footer" p="4">Footer</UiSurface>
  </div>
</template>

<style scoped>
.layout {
  grid-template-rows: auto 1fr auto;
}
</style>
