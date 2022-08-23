<script setup lang="ts">
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
</script>
<template>
  <div
    flex
    items-center
    gap-4
    bg="hover:light-3 dark:hover:dark-2"
    p="3"
    tabindex="1"
    divide-x
    divide="black/30 dark:white/30"
    select-none
    @click="onClick"
  >
    <div w-4 aspect-square :i-ui="props.icon" />
    <div p-l-5 flex gap-2>
      <slot />
    </div>
  </div>
</template>
