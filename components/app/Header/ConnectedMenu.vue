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
          h-9
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

      <template #menu>
        <UiDropdownItem icon="brush">
          {{ t('darkMode') }}
          <DarkModeToggle />
        </UiDropdownItem>
        <UiDropdownItem icon="globe">
          {{ t('selectLanguage') }}

          <AppLocaleSelector />
        </UiDropdownItem>
        <UiDropdownItem
          icon="power-off"
          close-on-click
          cursor-pointer
          @click="onLogout"
        >
          {{ t('logout') }}
        </UiDropdownItem>
      </template>
    </UiDropdown>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "darkMode": "Toggle Dark mode",
    "logout": "Sign off",
    "selectLanguage": "Select language"
  },
  "fr": {
    "darkMode": "Activer le thème sombre",
    "logout": "Se déconnecter",
    "selectLanguage": "Changer la langue"
  }
}
</i18n>
