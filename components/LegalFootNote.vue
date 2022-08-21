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
    "signin": "By signing in, you agree to our {tosLink} ans {policyLink}",
    "signup": "By signing up, you agree to our {tosLink} ans {policyLink}",
    "links": {
      "tos": "Terms of service",
      "privacy": "Privacy Policy"
    }
  }
}
</i18n>
