<script setup lang="ts">
const api = useDropdown();

const { menuNode, isOpened } = api;

const setMenuNode = (el: any) => {
  menuNode.value = el.$el;
};
</script>

<template>
  <ClientOnly>
    <UiSurface
      v-show="isOpened"
      :ref="el => setMenuNode(el)"
      p="x-6 y-3"
      rounded
      shadow="sm dark-7/20 dark:light-1/10"
    >
      <slot v-bind="api" />
    </UiSurface>
  </ClientOnly>
</template>
