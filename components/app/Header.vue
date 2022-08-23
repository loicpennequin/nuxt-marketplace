<script setup lang="ts">
import { throttle } from 'lodash-es';

const { data: currentUser, suspense } = useCurrentUser();
onServerPrefetch(suspense);

const { logoutMutation, isLoggedIn } = useAuth();
const { mutate: logout } = logoutMutation();
const onLogout = () => logout(null);
const { routes } = useTypedRouter();

const isCollapsed = ref(false);
const COLLAPSE_SCROLL_THRESHOLD = 100;
if (!import.meta.env.SSR) {
  let scrollY = window.scrollY;
  useEventListener(
    'scroll',
    throttle(
      () => {
        const diff = window.scrollY - scrollY;
        if (Math.abs(diff) < COLLAPSE_SCROLL_THRESHOLD) return;
        isCollapsed.value = window.scrollY >= scrollY;
        scrollY = window.scrollY;
      },
      200,
      { leading: true }
    )
  );
}
</script>

<template>
  <transition>
    <UiSurface is="header" v-if="!isCollapsed" p="y-3 x-5" sticky top-0>
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
              h-8
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
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  --at-apply: 'transition-transform duration-300';
}
.v-enter-from,
.v-leave-to {
  --at-apply: '-translate-y-full';
}
</style>
