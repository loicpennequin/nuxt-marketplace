<template>
  <UiButtonBase bg="brand-5 hover:brand-6" color="white disabled:gray-4">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="left" /></template>
  </UiButtonBase>
</template>
