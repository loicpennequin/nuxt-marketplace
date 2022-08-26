<script setup lang="ts">
import type { User, Media } from '@prisma/client';
import { Maybe } from '~~/utils/types';

type UserWithAvatar = User & { avatar?: Maybe<Media> };

const props = withDefaults(defineProps<{ user: UserWithAvatar; is?: any }>(), {
  is: 'div'
});

const backgroundImg = computed(
  () => props.user.avatar?.url && `url('${props.user.avatar?.url}')`
);
</script>

<template>
  <component
    :is="props.is"
    aspect-square
    p-3
    h="9"
    bg-brand-4
    flex
    justify-center
    items-center
    align-middle
    rounded="1/2"
    no-underline
    :contrast="props.user.avatar && 'hover:120'"
    :brightness="props.user.avatar && 'hover:110'"
    class="avatar"
  >
    <span v-if="!props.user.avatar">{{ props.user.username.charAt(0) }}</span>
  </component>
</template>

<style scoped>
.avatar {
  background-image: v-bind(backgroundImg);
  background-size: cover;
}
</style>
