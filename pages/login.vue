<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { loginDto, LoginDto } from '@/dtos/auth.dto';

const validationSchema = toFormValidator(loginDto);
const { login } = useAuth();
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
    <UiSurface>
      <form space-y-5 @submit.prevent="onSubmit">
        <div space-y-2>
          <label for="signup-email">Email</label>
          <UiTextInput id="signup-email" name="email" type="email" />
        </div>

        <div space-y-2>
          <label for="signup-password">Password</label>
          <UiTextInput
            id="signup-password"
            name="password"
            type="password"
            right-icon="eye"
          />
        </div>
        <button
          bg-blue-5
          color-white
          cursor-pointer
          font-xl
          mt-5
          p="x-16 y-2"
          self-start
          block
          w-full
        >
          Sign in
        </button>
      </form>

      <pre p-3 m-2 bg-dark-3>{{ form.values }}</pre>
      <p text-xs max-w="40ch" m-t="!10" color-dark-3 dark:color-light-3>
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </UiSurface>
  </div>
</template>
