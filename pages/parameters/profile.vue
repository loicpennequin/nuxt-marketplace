<script setup lang="ts">
const { t } = useI18n();

const { routes } = useTypedRouter();

const { data: currentUser } = useCurrentUser();
</script>

<template>
  <UiContainer max-w="md">
    <UiSurface p="10">
      <h2 text-2xl font-bold m-b-5>{{ t('title') }}</h2>

      <UserUpdateProfileForm />
      <UiButton
        variant="outlined"
        m-t-3
        w-full
        :to="{
          name: routes['profile-Slug'],
          params: { slug: currentUser?.slug }
        }"
      >
        {{ t('link') }}
      </UiButton>
    </UiSurface>
  </UiContainer>
</template>

<i18n lang="json">
{
  "en": { "title": "Edit my profile", "link": "Check my profile" },
  "fr": { "title": "Modifier mon profil", "link": "Check my profile" }
}
</i18n>
