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
  <UiContainer>
    <UiSurface>
      <div v-if="isLoading" flex justify-center><UiSpinner /></div>

      <div v-else-if="isError">Failed to load profile</div>
      <div v-else-if="!user">This user doesn't exist</div>
      <div v-else-if="user">
        <pre>{{ user.username }}</pre>
      </div>
    </UiSurface>
  </UiContainer>
</template>
