<script setup lang="ts">
import { useForm, Field } from 'vee-validate';
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
          <Field
            id="signup-email"
            bg-light-3
            dark:bg-dark-3
            name="email"
            p-2
            type="email"
            block
            w-full
          />
        </div>

        <div space-y-2>
          <label for="signup-password">Password</label>
          <Field
            id="signup-passwprd"
            bg-light-3
            dark:bg-dark-3
            name="password"
            p-2
            type="password"
            block
            w-full
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
      <p text-xs max-w="40ch" m-t="!10" color-dark-3 dark:color-light-3>
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </UiSurface>
  </div>
</template>
