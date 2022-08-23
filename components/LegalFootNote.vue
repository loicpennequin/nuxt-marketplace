<script setup lang="ts">
const { routes } = useTypedRouter();
const { t } = useI18n();

type KeyPath = 'signin' | 'signup';

const props = defineProps<{ keypath: KeyPath }>();
</script>

<template>
  <i18n-t
    :keypath="props.keypath"
    text-xs
    m-t="!10"
    color-dark-5
    dark:color-light-5
    tag="p"
  >
    <template #tosLink>
      <UiLink
        :to="{
          name: routes['cms-Page'],
          params: { page: 'terms-of-service' }
        }"
      >
        {{ t('links.tos') }}
      </UiLink>
    </template>

    <template #policyLink>
      <UiLink
        :to="{
          name: routes['cms-Page'],
          params: { page: 'security-policy' }
        }"
      >
        {{ t('links.policy') }}
      </UiLink>
    </template>
  </i18n-t>
</template>

<i18n lang="json">
{
  "en": {
    "signin": "By signing in, you agree to our {tosLink} and {policyLink}",
    "signup": "By signing up, you agree to our {tosLink} and {policyLink}",
    "links": {
      "tos": "Terms of service",
      "privacy": "Privacy Policy"
    }
  },
  "fr": {
    "signin": "En vous connectant, vous acceptez {tosLink} ainsi que {policyLink}",
    "signup": "En vous connectant, vous acceptez {tosLink} ainsi que {policyLink}",
    "links": {
      "tos": "nos Conditions d'utilisation",
      "privacy": "notre politique de respect de la vie privée"
    }
  }
}
</i18n>
