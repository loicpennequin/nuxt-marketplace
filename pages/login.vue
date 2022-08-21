<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <div flex items-center justify-center h-full>
    <UiContainer max-w="md">
      <UiSurface p="8">
        <Logo m="x-auto b-8" w-50 block m-x-auto />
        <LoginForm />

        <p text-xs m-t="!10" color-dark-5 dark:color-light-5>
          By signing in, you agree to our
          <NuxtLink
            color="brand-6 dark:brand-2"
            :to="{
              name: routes['cms-Page'],
              params: { page: 'termes-of-service' }
            }"
          >
            Terms of Service
          </NuxtLink>
          and
          <NuxtLink
            color="brand-6 dark:brand-2"
            :to="{
              name: routes['cms-Page'],
              params: { page: 'privacy-policy' }
            }"
          >
            Privacy policy
          </NuxtLink>
          .
        </p>
      </UiSurface>
    </UiContainer>
  </div>
</template>
