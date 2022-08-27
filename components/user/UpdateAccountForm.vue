<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { vFocus } from '@/directives/focus';
import { UpdateAccountDto, updateAccountDto } from '~~/dtos/account.dto';
import { Gender } from '~~/utils/constants/enums';

const { t } = useI18n();
const { data: currentUser, refetch } = useCurrentUser();

const {
  isLoading,
  mutate: updateProfile,
  reset,
  error
} = useTrpcMutation('account.updateAccount', {
  onSuccess() {
    console.log('ok');
    refetch();
  }
});

const { handleSubmit, values } = useForm<UpdateAccountDto>({
  validationSchema: toFormValidator(updateAccountDto),
  initialValues: {
    userId: currentUser.value?.id as string,
    gender: currentUser.value?.gender as Gender,
    firstname: currentUser.value?.firstname,
    lastname: currentUser.value?.lastname
  }
});

const onSubmit = handleSubmit(values => updateProfile(values));
const submitErrorMessage = useSubmitError(error);

const genders = [
  { label: t('genders.male'), value: Gender.MALE },
  { label: t('genders.female'), value: Gender.FEMALE },
  { label: t('genders.other'), value: Gender.OTHER }
];
</script>

<template>
  <form
    v-if="currentUser"
    ref="formElement"
    space-y-5
    @submit.prevent="onSubmit"
  >
    <UiFormControl
      id="update-account-firstname"
      v-slot="{ on, bind }"
      name="firstname"
      :label="t('firstname.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="update-profile-lastname"
      v-slot="{ on, bind }"
      name="lastname"
      :label="t('lastname.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signin-gender"
      v-slot="{ on, bind }"
      name="gender"
      :label="t('gender.label')"
    >
      <UiRadioGroup v-focus v-bind="bind" :values="genders" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="update-profile-phone-number"
      v-slot="{ on, bind }"
      name="phoneNumber"
      :label="t('phoneNumber.label')"
    >
      <UiPhoneInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiButton mt-5 w-full :is-loading="isLoading" @click="reset">
      {{ t('confirm') }}
    </UiButton>

    <pre>{{ values }}</pre>
    <UiFormError v-if="error" :error="submitErrorMessage" text-lg m-y-3 />
  </form>
</template>

<i18n lang="json">
{
  "en": {
    "gender": {
      "label": "Gender"
    },
    "firstname": {
      "label": "First Name"
    },
    "lastname": {
      "label": "Last Name"
    },
    "phoneNumber": {
      "label": "Phone  number"
    },
    "errors": {
      "500": "Sorry, we are not able to update your profile at this time. Please try again later."
    }
  },
  "fr": {
    "gender": {
      "label": "Genre"
    },
    "firstname": {
      "label": "Prénom"
    },
    "lastname": {
      "label": "Nom"
    },
    "phoneNumber": {
      "label": "N° de téléphone"
    },
    "errors": {
      "500": "Désolé, une erreur est survenue lors de la mise à jour de votre profil. Veuillez réessayer plus tard."
    }
  }
}
</i18n>
