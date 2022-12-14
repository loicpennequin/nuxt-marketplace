<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { vFocus } from '@/directives/focus';
import { UpdateAccountDto, updateAccountDto } from '~~/dtos/account.dto';
import { Gender } from '~~/utils/constants/enums';

const { t } = useI18n();
const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUser();

const {
  isLoading,
  mutate: updateProfile,
  reset,
  error
} = useTrpcMutation('account.updateAccount', {
  onSuccess() {
    refetchCurrentUser();
  }
});

const { handleSubmit, useFieldModel } = useForm<UpdateAccountDto>({
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

const phoneNumber = useFieldModel('phoneNumber');
const phoneCountryCode = useFieldModel('phoneCountryCode');
</script>

<template>
  <form v-if="currentUser" space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="update-account-email"
      name="email"
      :label="t('firstname.label')"
    >
      <UiTextInput
        id="update-account-email"
        :model-value="currentUser?.account?.email"
        disabled
        name="email"
      />
    </UiFormControl>

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
      id="signin-password"
      v-slot="{ bind, on }"
      name="password"
      :label="t('password.label')"
    >
      <UiPasswordInput v-bind="bind" v-on="on" />
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
      v-slot="{ bind: { id, name } }"
      name="phoneNumber"
      :label="t('phoneNumber.label')"
    >
      <UiPhoneInput
        v-model:number="phoneNumber"
        v-model:code="phoneCountryCode"
        :id="id"
        :name="name"
      />
    </UiFormControl>

    <UiButton mt-5 w-full :is-loading="isLoading" @click="reset">
      {{ t('confirm') }}
    </UiButton>

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
    "password": {
      "label": "Change password"
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
      "label": "Pr??nom"
    },
    "lastname": {
      "label": "Nom"
    },
    "phoneNumber": {
      "label": "N?? de t??l??phone"
    },
    "password": {
      "label": "Changer de mot de passe"
    },
    "errors": {
      "500": "D??sol??, une erreur est survenue lors de la mise ?? jour de votre profil. Veuillez r??essayer plus tard."
    }
  }
}
</i18n>
