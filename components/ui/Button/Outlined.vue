<template>
  <UiButtonBase
    bg="transparent hover:brand-5"
    bg-opacity="hover:10"
    color="brand-5 dark:brand-3"
    border="solid 1 currentColor"
  >
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>
