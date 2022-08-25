<script setup lang="ts">
import AppLink from '@/components/app/Link.vue';

const api = useDropdown();

const props = withDefaults(
  defineProps<{ closeOnClick?: boolean; icon?: string }>(),
  {
    closeOnClick: false,
    icon: ''
  }
);

const onClick = () => {
  if (props.closeOnClick) api.close();
};

const attrs = useAttrs();
const is = computed(() => (attrs.to ? AppLink : 'div'));
</script>
<template>
  <component
    :is="is"
    tabindex="1"
    flex
    items-center
    gap-4
    bg="hover:light-3 dark:hover:dark-2"
    p="3"
    divide-x
    divide="black/30 dark:white/30"
    select-none
    no-underline
    color="inherit"
    @click="onClick"
  >
    <div w-4 aspect-square :i-ui="props.icon" />
    <div p-l-5 flex items-center gap-2 flex-1>
      <slot />
    </div>
  </component>
</template>
