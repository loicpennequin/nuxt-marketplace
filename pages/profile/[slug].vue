<script setup lang="ts">
import { profileLoader } from '~~/loaders/profile';

definePageMeta({
  loader: profileLoader
});

const {
  user: { isLoading, data: user, isError }
} = profileLoader.load();

const { t } = useI18n();
</script>

<template>
  <UiContainer max-w="screen-xl" m-y-6>
    <UiSurface v-if="isLoading" flex justify-center><UiSpinner /></UiSurface>

    <UiSurface v-else-if="isError">{{ t('loadingError') }}</UiSurface>
    <UiSurface v-else-if="!user">{{ t('empty') }}</UiSurface>

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
    "loadingError": "Failed to load profile",
    "empty": "This user doesn't exist"
  },
  "fr": {
    "loadingError": "Erreur lors du chargement du profile",
    "empty": "Cet utilisateur n'existe pas"
  }
}
</i18n>
