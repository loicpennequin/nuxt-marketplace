<script setup lang="ts">
import type { User } from '@prisma/client';

const props = defineProps<{ user: User }>();

const { t } = useI18n();
const { routes } = useTypedRouter();

const createdTimeAgo = useTimeAgo(
  computed(() => new Date(props.user?.createdAt || Date.now()))
);
const lastOnlineTimeAgo = useTimeAgo(
  computed(() => new Date(props.user?.lastOnlineAt || Date.now()))
);
</script>

<template>
  <div space-y-2>
    <h2 font-bold text="lt-sm:center 2xl sm:xl">
      {{ props.user.username }}
    </h2>
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
