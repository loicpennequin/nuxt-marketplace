<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { CreateUserDto, createUserDto } from '~~/dtos/user.dto';
import { Gender } from '@/utils/constants/enums';
import { vFocus } from '@/directives/focus';

const { t } = useI18n();
const { router, routes } = useTypedRouter();

const {
  isLoading,
  mutate: signUp,
  reset,
  error
} = useTrpcMutation('user.create', {
  onSuccess() {
    router.push({ name: routes['email-Confirm'] });
  }
});

const { handleSubmit } = useForm<CreateUserDto>({
  validationSchema: toFormValidator(createUserDto),
  initialValues: {
    username: '',
    email: '',
    password: '',
    // @ts-ignore - should be provided by user
    gender: undefined
  }
});

const onSubmit = handleSubmit(values => signUp(values));
const submitErrorMessage = useSubmitError(error);

const genders = [
  { label: t('gender.male'), value: Gender.MALE },
  { label: t('gender.female'), value: Gender.FEMALE },
  { label: t('gender.other'), value: Gender.OTHER }
];
</script>

<template>
  <form ref="formElement" space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="signin-gender"
      v-slot="{ on, bind }"
      name="gender"
      :label="t('gender.label')"
    >
      <UiRadioGroup v-focus v-bind="bind" :values="genders" v-on="on" />
    </UiFormControl>

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
    "submit": "Next",
    "gender": {
      "label": "Gender",
      "male": "Male",
      "female": "Female",
      "other": "Other"
    },
    "username": {
      "label": "Username"
    },
    "email": {
      "label": "E-mail",
      "exists": "This e-mail is already in use."
    },
    "password": {
      "label": "Password"
    },
    "errors": {
      "500": "Sorry, we are not able to create your account at this time. Please try again later.",
      "EMAIL_ALREADY_EXISTS": "An account with this email already exists."
    }
  },
  "fr": {
    "submit": "Suivant",
    "gender": {
      "label": "Genre",
      "male": "Homme",
      "female": "Femme",
      "other": "Autre"
    },
    "username": {
      "label": "Pseudo"
    },
    "email": {
      "label": "Adresse e-mail",
      "exists": "Cette adresse e-mail est déjà utilisée."
    },
    "password": {
      "label": "Mot de passe"
    },
    "errors": {
      "500": "Désolé, une erreur est survenue lors de la création de votre compte. Veuillez réessayer plus tard.",
      "EMAIL_ALREADY_EXISTS": "Cette adresse e-mail est déjà utilisée."
    }
  }
}
</i18n>
