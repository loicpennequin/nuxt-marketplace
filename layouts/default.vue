<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <div min-h="screen" grid class="layout">
    <AppHeader />

    <main bg-light-4 dark:bg-dark-3 max-w-screen>
      <slot />
    </main>

    <UiSurface is="footer" p="8">
      <UiContainer flex justify-between flex-wrap>
        <div grow="1 sm:0" text-center m-b="8 sm:0">
          Created by
          <a underline href="https://github.com/loicpennequin" target="_blank">
            Daria
          </a>
        </div>

        <div flex gap-5 flex-wrap text="children:center">
          <NuxtLink
            :to="{
              name: routes['cms-Page'],
              params: { page: 'termes-of-service' }
            }"
          >
            Terms of Service
          </NuxtLink>
          <NuxtLink
            :to="{
              name: routes['cms-Page'],
              params: { page: 'privacy-policy' }
            }"
          >
            Privacy Policy
          </NuxtLink>
          <NuxtLink
            :to="{
              name: routes['cms-Page'],
              params: { page: 'cookies-policy' }
            }"
          >
            cookies
          </NuxtLink>

          <div grow="1 sm:0">© 2022 Daria, All rights reserved.</div>
        </div>
      </UiContainer>
    </UiSurface>
  </div>
</template>

<style scoped>
.layout {
  grid-template-rows: auto 1fr auto;
}
</style>
