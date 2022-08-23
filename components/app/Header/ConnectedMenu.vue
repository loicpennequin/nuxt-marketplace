<script setup lang="ts">
const { data: currentUser } = useCurrentUser();

const { logoutMutation } = useAuth();
const { mutate: logout } = logoutMutation();

const onLogout = () => logout(null);
const isDropdownOpened = ref(false);
const { t } = useI18n();
</script>

<template>
  <div flex gap-3 m-l-auto items-center>
    <UiDropdown v-model="isDropdownOpened">
      <template #toggle="{ on }">
        <button
          aspect-square
          p-3
          h-8
          bg-brand-3
          flex
          justify-center
          items-center
          align-middle
          rounded="1/2"
          v-on="on"
        >
          {{ currentUser?.username.charAt(0) }}
        </button>
      </template>

      <template #content>
        <div space-y-3>
          <div flex gap-3>
            {{ t('darkMode') }}
            <DarkModeToggle />
          </div>
          <button @click="onLogout">Logout</button>
        </div>
      </template>
    </UiDropdown>
  </div>
</template>

<i18n lang="json">
{ "en": { "darkMode": "Toggle Dark mode" } }
</i18n>
