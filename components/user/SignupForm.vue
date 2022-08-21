<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { CreateUserDto, createUserDto } from '~~/dtos/user.dto';

const { t, te } = useI18n();
const { router, routes } = useTypedRouter();

const {
  isLoading,
  mutate: signUp,
  reset,
  error
} = useTrpcMutation('user.create', {
  onSuccess() {
    router.push({ name: routes.index });
  }
});
const { handleSubmit } = useForm<CreateUserDto>({
  validationSchema: toFormValidator(createUserDto),
  initialValues: {
    username: '',
    email: '',
    password: ''
  }
});

const onSubmit = handleSubmit(values => signUp(values));
const submitErrorMessage = computed(() => {
  if (!error.value) return '';
  const { httpStatus } = error.value.data;

  return te(`errors.${httpStatus}`)
    ? t(`errors.${httpStatus}`)
    : t(`errors.500`);
});
</script>

<template>
  <form space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="signin-username"
      v-slot="{ on, bind }"
      name="username"
      :label="t('username.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signin-mail"
      v-slot="{ on, bind }"
      name="email"
      :label="t('email.label')"
    >
      <UiTextInput v-bind="bind" type="email" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signin-password"
      v-slot="{ bind, on }"
      name="password"
      :label="t('password.label')"
    >
      <UiPasswordInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiButton mt-5 w-full :is-loading="isLoading" @click="reset">
      {{ t('submit') }}
    </UiButton>

    <UiFormError v-if="error" :error="submitErrorMessage" text-lg m-y-3 />
  </form>
</template>

<i18n lang="json">
{
  "en": {
    "submit": "Sign up",
    "username": {
      "label": "Username"
    },
    "email": {
      "label": "E-mail"
    },
    "password": {
      "label": "Password"
    },
    "errors": {
      "500": "Something wrong happened, please try again later."
    }
  }
}
</i18n>
