<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { loginDto, LoginDto } from '@/dtos/auth.dto';
import { vFocus } from '@/directives/focus';

const { t } = useI18n();
const { router, routes } = useTypedRouter();
const route = useRoute();

const { loginMutation } = useAuth();
const {
  isLoading,
  mutate: login,
  reset,
  error
} = loginMutation({
  onSuccess() {
    router.push((route.query.from as any) ?? { name: routes.index });
  }
});
const { handleSubmit } = useForm<LoginDto>({
  validationSchema: toFormValidator(loginDto),
  initialValues: {
    email: '',
    password: ''
  }
});

const onSubmit = handleSubmit(values => login(values));
const submitErrorMessage = useSubmitError(error);
</script>

<template>
  <form space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="signup-mail"
      v-slot="{ on, bind }"
      name="email"
      :label="t('email.label')"
    >
      <UiTextInput v-focus v-bind="bind" type="email" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signup-password"
      v-slot="{ bind, on }"
      name="password"
      :label="t('password.label')"
    >
      <UiPasswordInput v-bind="bind" v-on="on" />

      <div text-right>
        <AppLink :to="{ name: routes['lost-Password'] }" inline-block m-l-auto>
          {{ t('forgotPassword') }}
        </AppLink>
      </div>
    </UiFormControl>

    <UiButton mt-5 w-full :is-loading="isLoading" @click="reset">
      {{ t('submit') }}
    </UiButton>

    <UiButton
      mt-3
      w-full
      type="button"
      :to="{ name: routes.register }"
      variant="outlined"
    >
      {{ t('register') }}
    </UiButton>

    <UiFormError v-if="error" :error="submitErrorMessage" text-lg m-y-3 />
  </form>
</template>

<i18n lang="json">
{
  "en": {
    "submit": "Sign in",
    "register": "Create an account",
    "forgotPassword": "I forgot my password",

    "email": {
      "label": "E-mail"
    },
    "password": {
      "label": "Password"
    },
    "errors": {
      "401": "Your e-mail or password is incorrect."
    }
  },
  "fr": {
    "submit": "Se connecter",
    "register": "Je n'ai pas de compte",
    "forgotPassword": "J'ai oubli?? mon mot de passe",

    "email": {
      "label": "Adresse e-mail"
    },
    "password": {
      "label": "Mot de passe"
    },
    "errors": {
      "401": "Votre adresse e-mail ou votre mot de passe est incorrect."
    }
  }
}
</i18n>
