<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{ prefetch?: boolean; to: RouteLocationRaw }>(),
  {
    prefetch: true
  }
);
const queryClient = useQueryClient();

const { resolve } = useRouter();

let timeout: ReturnType<typeof setTimeout>;

const preloadData = () => {
  resolve(props.to).matched.forEach(match => {
    match.meta.loader?.preload(resolve(props.to), queryClient);
  });
};

const preloadAssets = () => {
  resolve(props.to).matched.forEach(match => {
    if (!match.components) return;
    Object.values(match.components).forEach(fn => {
      if (typeof fn !== 'function') return;
      // @ts-ignore
      fn();
    });
  });
};

const onMouseEnter = () => {
  if (props.prefetch === false) return;

  timeout = setTimeout(() => {
    preloadData();
    preloadAssets();
  }, 250);
};

const onMouseLeave = () => {
  if (!props.prefetch) return;
  clearTimeout(timeout);
};
</script>

<template>
  <UiLink :to="props.to" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot />
  </UiLink>
</template>
