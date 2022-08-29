<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});

const { routes } = useTypedRouter();
const { t } = useI18n();

type MenuItem = {
  icon: string;
  label: string;
  target: string;
};

const menuItems: MenuItem[] = [
  {
    icon: 'user',
    label: t('profile'),
    target: routes.parameters.profile
  },
  {
    icon: 'account',
    label: t('account'),
    target: routes.parameters.account
  },
  {
    icon: 'credit-card',
    label: t('payment'),
    target: routes.parameters.payment
  },
  {
    icon: 'bell',
    label: t('notifications'),
    target: routes.parameters.notifications
  }
];
</script>

<template>
  <UiContainer sm="grid" gap-5 class="parameters" h-full>
    <UiSurface lt-sm="hidden" p="x-5 y-6" as="nav">
      <ul divide-y divide="black/30 dark:white/30">
        <li v-for="item in menuItems" :key="item.target" p="y-6">
          <UiLink
            :to="{ name: item.target }"
            color="inherit hover:brand-4 dark:hover:brand-2"
            no-underline
            flex
            items-center
            gap-3
          >
            <span :i-ui="item.icon" w-6 h-6 />
            {{ item.label }}
          </UiLink>
        </li>
      </ul>
    </UiSurface>

    <NuxtPage />
  </UiContainer>
</template>

<style scoped>
.parameters {
  grid-template-columns: minmax(20rem, auto) 1fr;
}

.parameters:deep(.router-link-exact-active) {
  --at-apply: 'font-bold color-brand-5 dark:color-brand-3';
}
</style>

<i18n lang="json">
{
  "en": {
    "profile": "My profile",
    "account": "My account",
    "notifications": "Notifications",
    "payment": "Payment"
  },
  "fr": {
    "profile": "Mon profil",
    "account": "Mon compte",
    "notifications": "Notifications",
    "payment": "Paiement"
  }
}
</i18n>
