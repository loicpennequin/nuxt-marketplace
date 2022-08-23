<script setup lang="ts">
const { routes } = useTypedRouter();
const { t } = useI18n();

const isDropdownOpened = ref(false);
</script>

<template>
  <div flex gap-3 m-l-auto items-center>
    <UiButton :to="{ name: routes.login }" p="x-3 y-2">
      {{ t('login') }}
    </UiButton>

    <UiDropdown v-model="isDropdownOpened">
      <template #toggle="{ on }">
        <button
          bg="hover:brand-5 focus:brand:6 dark:focus-visible:brand-3"
          rounded="1/2"
          :title="t('settings')"
          align-middle
          p-1
          aspect-square
          p-3
          h-3
          i-ui-dots-vertical
          v-on="on"
        />
      </template>

      <template #menu>
        <UiDropdownItem>
          {{ t('darkMode') }}
          <DarkModeToggle />
        </UiDropdownItem>
        <UiDropdownItem icon="globe">
          {{ t('selectLanguage') }}

          <AppLocaleSelector />
        </UiDropdownItem>
      </template>
    </UiDropdown>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "login": "Login",
    "settings": "settings",
    "darkMode": "Toggle Dark mode",
    "selectLanguage": "Select language"
  },
  "fr": {
    "login": "Connexion",
    "settings": "Paramètres",
    "darkMode": "Activer le thème sombre",
    "selectLanguage": "Changer la langue"
  }
}
</i18n>
