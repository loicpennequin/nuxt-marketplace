<script setup lang="ts">
import type { User } from '@prisma/client';

const props = defineProps<{ user: User }>();

const { data: currentUser } = useCurrentUser();
const { t } = useI18n();
const { routes } = useTypedRouter();
const isOwnProfile = computed(() => props.user.id === currentUser.value?.id);
</script>

<template>
  <div flex flex-col>
    <UiButton
      v-if="isOwnProfile"
      :to="{ name: routes.parameters.profile }"
      left-icon="edit-profile"
    >
      {{ t('edit') }}
    </UiButton>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "edit": "Edit profile"
  },
  "fr": {
    "edit": "Modifier mon profil"
  }
}
</i18n>
