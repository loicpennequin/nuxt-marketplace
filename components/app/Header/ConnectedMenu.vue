<script setup lang="ts">
const { data: currentUser } = useCurrentUser();

const { logoutMutation } = useAuth();
const { mutate: logout } = logoutMutation();

const onLogout = () => logout(null);
</script>

<template>
  <div flex gap-3 m-l-auto items-center>
    <UiDropdown>
      <template #toggle="{ on }">
        <button
          aspect-square
          p-3
          h-8
          bg-brand-3
          flex
          justify-center
          items-center
          rounded="1/2"
          v-on="on"
        >
          {{ currentUser?.username.charAt(0) }}
        </button>
      </template>

      <template #content>
        <button @click="onLogout">Logout</button>
      </template>
    </UiDropdown>

    <DarkModeToggle />
  </div>
</template>
