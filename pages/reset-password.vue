<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { resetPasswordDto, ResetPasswordDto } from '~~/dtos/account.dto';

const { t } = useI18n();
const route = useRoute();
const {
  isLoading,
  mutate: resetPassword,
  reset,
  error,
  isSuccess
} = useTrpcMutation('account.resetPassword');

const { handleSubmit } = useForm<ResetPasswordDto>({
  validationSchema: toFormValidator(resetPasswordDto),
  initialValues: {
    token: route.query.token as string,
    password: ''
  }
});

const onSubmit = handleSubmit(values => resetPassword(values));
const submitErrorMessage = useSubmitError(error);
</script>

<template>
  <div flex items-center justify-center h-full>
    <UiContainer max-w="md">
      <UiSurface>
        <form space-y-5 @submit.prevent="onSubmit">
          <h2 text-2xl font-bold>{{ t('title') }}</h2>
          <UiFormControl
            id="new-password"
            v-slot="{ on, bind }"
            name="password"
            :label="t('password.label')"
          >
            <UiPasswordInput v-bind="bind" v-on="on" />
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
    "title": "Password reset",
    "submit": "Valider",
    "success": "Password changed successfully.",
    "password": {
      "label": "Please select a new password."
    }
  },
  "fr": {
    "title": "Réinitialisation du mot de passe",
    "submit": "Confirm",
    "success": "Mot de passe modifié avec succès.",
    "password": {
      "label": "Veuillez choisir un nouveau mot de passe"
    }
  }
}
</i18n>
