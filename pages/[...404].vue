<script setup lang="ts">
const { routes } = useTypedRouter();
</script>
<template>
  <UiContainer h-full>
    <UiCenter>
      <UiSurface p="15" w-full max-w-screen-sm text-center>
        <Logo h-12 m-b-8 />
        <h2 text-2xl m-b-2>
          <span font-bold>404</span>
          - Not Found
        </h2>

        <AppLink :to="{ name: routes.index }">Back To Home</AppLink>
      </UiSurface>
    </UiCenter>
  </UiContainer>
</template>
