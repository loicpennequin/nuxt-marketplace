<script setup lang="ts">
import { throttle } from 'lodash-es';
import ConnectedMenu from './ConnectedMenu.vue';
import DisconnectedMenu from './DisconnectedMenu.vue';

const { isLoggedIn } = useAuth();
const { t } = useI18n();
const { routes } = useTypedRouter();

const menuComponent = computed(() =>
  isLoggedIn.value ? ConnectedMenu : DisconnectedMenu
);

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
    <UiSurface is="header" v-if="!isCollapsed" p="y-3 x-5" sticky top-0 z-1>
      <UiContainer flex gap-4>
        <h1><Logo h-full /></h1>
        <UiButton
          :to="{ name: routes.sell }"
          variant="outlined"
          m-l-auto
          p="x-3 y-2"
          lt-sm="hidden"
        >
          {{ t('sell') }}
        </UiButton>
        <component :is="menuComponent" m-l="lt-sm:auto" />
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

<i18n lang="json">
{ "en": { "sell": "Sell now" }, "fr": { "sell": "Vendre maintenant" } }
</i18n>
