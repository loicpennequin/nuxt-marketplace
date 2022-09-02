<script setup lang="ts">
import { profileLoader } from '~~/loaders/profile';

definePageMeta({
  loader: profileLoader
});

const {
  user: { isLoading, data: user, isError }
} = profileLoader.load();
</script>

<template>
  <UiContainer max-w="screen-xl" m-y-6>
    <UiSurface v-if="isLoading" flex justify-center><UiSpinner /></UiSurface>

    <UiSurface v-else-if="isError">Failed to load profile</UiSurface>
    <UiSurface v-else-if="!user">This user doesn't exist</UiSurface>
    <template v-else-if="user">
      <UiSurface flex gap-6 lt-sm="flex-col" m-b-5>
        <div self="lt-sm:center">
          <UserAvatar :user="user" h="30 sm:22" text-2xl />
        </div>
        <UserProfileInfos :user="user" flex-1 />
        <UserProfileActions :user="user" m-r="sm:8" />
      </UiSurface>

      <UserProducts :user="user" />
    </template>
  </UiContainer>
</template>

<i18n lang="json">
{
  "en": {
    "joinedAt": "Joined {timeago}",
    "lastOnline": "Last online {timeago}"
  },
  "fr": {
    "joinedAt": "Incrit {timeago}",
    "lastOnline": "Dernière connexion {timeago}"
  }
}
</i18n>
