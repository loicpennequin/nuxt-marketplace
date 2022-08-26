<script setup lang="ts">
import { profileLoader } from '~~/loaders/profile';

definePageMeta({
  loader: profileLoader
});

const {
  user: { isLoading, data: user, isError }
} = profileLoader.load();

const createdTimeAgo = useTimeAgo(
  computed(() => new Date(user.value?.createdAt || Date.now()))
);
const lastOnlineTimeAgo = useTimeAgo(
  computed(() => new Date(user.value?.lastOnlineAt || Date.now()))
);

const { t } = useI18n();
</script>

<template>
  <UiContainer max-w="screen-xl" m-y-6>
    <UiSurface v-if="isLoading" flex justify-center><UiSpinner /></UiSurface>

    <UiSurface v-else-if="isError">Failed to load profile</UiSurface>
    <UiSurface v-else-if="!user">This user doesn't exist</UiSurface>
    <template v-else-if="user">
      <UiSurface flex gap-6>
        <UserAvatar :user="user" h="22" text-2xl />
        <div space-y-2>
          <h2 text-xl font-bold>{{ user.username }}</h2>
          <p flex items="start sm:center" gap-2>
            <span i-ui-arrow-right-to-bracket h-5 />
            {{ t('joinedAt', { timeago: createdTimeAgo }) }}
          </p>
          <p flex items="start sm:center" gap-2>
            <span i-ui-clock h-5 />
            {{ t('lastOnline', { timeago: lastOnlineTimeAgo }) }}
          </p>

          <div
            m-t="5!"
            p-3
            italic
            border="solid 1 light-7 dark:dark-4"
            whitespace-pre-wrap
          >
            <div
              w-8
              h-8
              i-ui-quote-left
              float-left
              bg="currentColor"
              m-r-2
              m-l="-5"
              m-t="-3"
            />
            <p>{{ user.bio }}</p>
          </div>
        </div>
      </UiSurface>
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
