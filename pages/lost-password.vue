<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import {
  sendPasswordResetEmailDto,
  SendPasswordResetEmailDto
} from '~~/dtos/account.dto';

const { t } = useI18n();

const {
  isLoading,
  mutate: sendEmail,
  reset,
  error,
  isSuccess
} = useTrpcMutation('account.sendPasswordresetMail');

const { handleSubmit } = useForm<SendPasswordResetEmailDto>({
  validationSchema: toFormValidator(sendPasswordResetEmailDto),
  initialValues: {
    email: ''
  }
});

const onSubmit = handleSubmit(values => sendEmail(values));
const submitErrorMessage = useSubmitError(error);
</script>

<template>
  <div flex items-center justify-center h-full>
    <UiContainer max-w="md">
      <UiSurface>
        <form space-y-5 @submit.prevent="onSubmit">
          <h2 text-2xl font-bold>{{ t('title') }}</h2>
          <p>{{ t('subtitle') }}</p>
          <UiFormControl
            id="email"
            v-slot="{ on, bind }"
            name="email"
            :label="t('email.label')"
          >
            <UiTextInput v-bind="bind" type="email" v-on="on" />
          </UiFormControl>

          <UiButton mt-5 w-full :is-loading="isLoading" @click="reset">
            {{ t('submit') }}
          </UiButton>

          <UiFormError v-if="error" :error="submitErrorMessage" text-lg m-y-3 />

          <p v-if="isSuccess" text-lg color="brand-6 dark:brand-3">
            {{ t('success') }}
          </p>
        </form>
      </UiSurface>
    </UiContainer>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Lost your password ?",
    "subtitle": "Please fill the form below. We will send you an e-mail containing a link to select a new password.",
    "submit": "Send password reset email",
    "success": "If an account with this e-mail address exists on our platform, an e-mail will be sent shortly.",
    "email": {
      "label": "E-mail"
    }
  },
  "fr": {
    "title": "Mot de passe perdu ?",
    "subtitle": "Veuillez remplir le formulaire ci-dessous. Nous vous enverrons un e-mail contenant un lien permettant de réinitialiser votre mot de passe",
    "submit": "Confirmer",
    "success": "Si un compte associé à cet adresse existe, un e-mail sera envoyé dans quelques instants.",
    "email": {
      "label": "Adresse e-mail"
    }
  }
}
</i18n>
