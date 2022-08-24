<script setup lang="ts">
const api = useDropdown();

const { menuNode, isOpened } = api;
</script>

<template>
  <ClientOnly>
    <div ref="menuNode" overflow-hidden>
      <transition appear>
        <UiSurface
          v-show="isOpened"
          p="0"
          rounded
          border="solid 1 light-8 dark:dark-4 "
        >
          <slot v-bind="api" />
        </UiSurface>
      </transition>
    </div>
  </ClientOnly>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  --at-apply: 'transition-all duration-200';
}
.v-enter-from,
.v-leave-to {
  --at-apply: '-translate-y-5 opacity-0';
}
</style>
