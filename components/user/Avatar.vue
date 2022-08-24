<script setup lang="ts">
import type { User } from '@prisma/client';

const props = withDefaults(defineProps<{ user: User; is?: any }>(), {
  is: 'div'
});
</script>

<template>
  <component
    :is="props.is"
    aspect-square
    p-3
    h="9"
    bg-brand-3
    flex
    justify-center
    items-center
    align-middle
    rounded="1/2"
  >
    {{ props.user.username.charAt(0) }}
  </component>
</template>
