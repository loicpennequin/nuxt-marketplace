<script setup lang="ts">
const { data: users, error, isLoading } = useTrpcQuery(['user.findAll']);
const { routes } = useTypedRouter();
</script>

<template>
  <UiContainer m-y-5>
    <UiSurface>
      <div v-if="isLoading" flex justify-center><UiSpinner /></div>
      <div v-else-if="error">An error has occured.</div>
      <div v-else-if="users && !users.length">There are no users yet.</div>
      <ul v-else-if="users" space-y-5>
        <li v-for="user in users" :key="user.id">
          <AppLink
            :to="{ name: routes['profile-Slug'], params: { slug: user.slug } }"
            flex
            items-center
            gap-3
          >
            <UserAvatar :user="user" />
            {{ user.username }}#{{ user.usernameTag }}
          </AppLink>
        </li>
      </ul>
    </UiSurface>
  </UiContainer>
</template>
