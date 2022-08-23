<script setup lang="ts">
const api = useDropdown();

const { menuNode, isOpened } = api;

const setMenuNode = (el: any) => {
  menuNode.value = el?.$el;
};
</script>

<template>
  <ClientOnly>
    <UiSurface
      v-show="isOpened"
      :ref="el => setMenuNode(el)"
      p="0"
      rounded
      border="solid 1 light-8 dark:dark-4 "
    >
      <slot v-bind="api" />
    </UiSurface>
  </ClientOnly>
</template>
