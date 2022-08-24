<script setup lang="ts">
const { data: currentUser } = useCurrentUser();

const { logoutMutation } = useAuth();
const { mutate: logout } = logoutMutation();

const onLogout = () => logout(null);
const isDropdownOpened = ref(false);

const { t } = useI18n();

const { routes } = useTypedRouter();
</script>

<template>
  <div v-if="currentUser" flex gap-3 m-l-auto items-center>
    <UiDropdown v-model="isDropdownOpened">
      <template #toggle="{ on }">
        <UserAvatar is="button" :user="currentUser" v-on="on" />
      </template>

      <template #menu>
        <UiDropdownItem icon="user" close-on-click>
          <AppLink
            flex-1
            no-underline
            color="inherit"
            :to="{
              name: routes['profile-Slug'],
              params: { slug: currentUser?.slug }
            }"
          >
            {{ t('profile') }}
          </AppLink>
        </UiDropdownItem>
        <UiDropdownItem icon="brush">
          {{ t('darkMode') }}
          <DarkModeToggle />
        </UiDropdownItem>
        <UiDropdownItem icon="globe">
          {{ t('selectLanguage') }}

          <AppLocaleSelector m-l-auto flex-1 />
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
    "selectLanguage": "Select language",
    "profile": "My profile"
  },
  "fr": {
    "darkMode": "Activer le thème sombre",
    "logout": "Se déconnecter",
    "selectLanguage": "Changer la langue",
    "profile": "Mon profil"
  }
}
</i18n>
