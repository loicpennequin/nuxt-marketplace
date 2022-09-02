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
    h="9"
    bg-brand-4
    flex
    justify-center
    items-center
    align-middle
    rounded="1/2"
    no-underline
    class="avatar"
  >
    <svg v-if="!props.user.avatar" viewBox="0 0 20 20" h="3/5">
      <text x="50%" y="16" text-anchor="middle">
        {{ props.user.username.charAt(0) }}
      </text>
    </svg>
  </component>
</template>

<style scoped>
.avatar {
  background-image: v-bind(backgroundImg);
  background-size: cover;
}
</style>
