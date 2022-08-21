<script setup lang="ts">
import { useForm, Field } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { loginDto, LoginDto } from '@/dtos/auth.dto';

const { t, te } = useI18n();

const validationSchema = toFormValidator(loginDto);
const { loginMutation } = useAuth();
const {
  isLoading,
  mutate: login,
  reset,
  error
} = loginMutation({
  onSuccess() {
    router.push({ name: routes.index });
  }
});
const { handleSubmit, useFieldModel } = useForm<LoginDto>({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
});

const { router, routes } = useTypedRouter();
const onSubmit = handleSubmit(values => login(values));
const submitErrorMessage = computed(() => {
  if (!error.value) return '';
  const { httpStatus } = error.value.data;

  return te(`errors.${httpStatus}`)
    ? t(`errors.${httpStatus}`)
    : t(`errors.500`);
});

const email = useFieldModel('email');
const password = useFieldModel('password');
</script>

<template>
  <form space-y-5 @submit.prevent="onSubmit">
    <div space-y-2>
      <label for="signup-email">{{ t('email.label') }}</label>
      <Field v-slot="{ meta, errorMessage }" name="email">
        <UiTextInput
          v-model="email"
          id="signup-email"
          name="email"
          type="email"
        />
        <UiFormError
          v-if="errorMessage && meta.touched"
          :error="t(errorMessage)"
        />
      </Field>
    </div>

    <div space-y-2>
      <label for="signup-password">{{ t('password.label') }}</label>
      <Field v-slot="{ meta, errorMessage }" name="password">
        <UiPasswordInput
          v-model="password"
          id="signup-password"
          name="password"
        />
        <UiFormError
          v-if="errorMessage && meta.touched"
          :error="t(errorMessage)"
        />
      </Field>
    </div>
    <UiButton mt-5 self-start w-full :is-loading="isLoading" @click="reset">
      {{ t('submit') }}
    </UiButton>
    <UiFormError v-if="error" :error="submitErrorMessage" text-lg m-y-3 />
  </form>
</template>

<i18n lang="json">
{
  "en": {
    "submit": "Sign in",
    "email": {
      "label": "E-mail"
    },
    "password": {
      "label": "Password"
    },
    "errors": {
      "401": "Your e-mail or password is incorrect.",
      "500": "Something wrong happened, please try again later."
    }
  }
}
</i18n>
