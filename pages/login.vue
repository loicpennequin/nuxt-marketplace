<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { loginDto, LoginDto } from '@/dtos/auth.dto';

const validationSchema = toFormValidator(loginDto);
const { loginMutation } = useAuth();
const { isLoading, mutateAsync: login } = loginMutation();
const form = useForm<LoginDto>({
  validationSchema,
  initialValues: {
    password: '',
    email: ''
  }
});

const { router, routes } = useTypedRouter();
const onSubmit = form.handleSubmit(async values => {
  await login(values);
  router.push({ name: routes.index });
});
</script>

<template>
  <div flex items-center justify-center h-full>
    <UiSurface p="8">
      <Logo m="x-auto b-8" w-50 block m-x-auto />
      <form space-y-5 @submit.prevent="onSubmit">
        <div space-y-2>
          <label for="signup-email">Email</label>
          <UiTextInput id="signup-email" name="email" type="email" />
        </div>

        <div space-y-2>
          <label for="signup-password">Password</label>
          <UiPasswordInput id="signup-password" name="password" />
        </div>
        <UiButton mt-5 self-start w-full :is-loading="isLoading">
          Sign in
        </UiButton>
      </form>

      <p text-xs max-w="40ch" m-t="!10" color-dark-5 dark:color-light-5>
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
  </div>
</template>
