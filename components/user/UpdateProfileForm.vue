<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { UpdateProfileDto, updateProfileDto } from '~~/dtos/user.dto';
import { Gender } from '@/utils/constants/enums';
import { vFocus } from '@/directives/focus';

const { t } = useI18n();
const { data: currentUser, refetch } = useCurrentUser();

const {
  isLoading,
  mutate: updateProfile,
  reset,
  error
} = useTrpcMutation('user.updateProfile', {
  onSuccess() {
    console.log('ok');
    refetch();
  }
});

const { handleSubmit, values, setFieldValue, errors } =
  useForm<UpdateProfileDto>({
    validationSchema: toFormValidator(updateProfileDto),
    initialValues: {
      id: currentUser.value?.id as string,
      username: currentUser.value?.username,
      firstname: currentUser.value?.firstname,
      bio: currentUser.value?.bio,
      gender: currentUser.value?.gender
    }
  });

const onSubmit = handleSubmit(values => updateProfile(values));
const submitErrorMessage = useSubmitError(error);

const genders = [
  { label: t('genders.male'), value: Gender.MALE },
  { label: t('genders.female'), value: Gender.FEMALE },
  { label: t('genders.other'), value: Gender.OTHER }
];

const { readAsDataURL } = useFileReader();

const avatarVModel = computed<any>({
  get: () => [],
  set: async (val: Blob[]) => {
    setFieldValue('avatarBase64', await readAsDataURL(val[0]));
  }
});
</script>

<template>
  <form
    v-if="currentUser"
    ref="formElement"
    space-y-5
    @submit.prevent="onSubmit"
  >
    <UiFormControl
      id="signin-avatar"
      v-slot="{ bind }"
      name="avatarBase64"
      :label="t('avatar.label')"
    >
      <div grid grid-cols-2 items-center justify-items-center>
        <div h-30>
          <img
            v-if="values.avatarBase64"
            :src="values.avatarBase64"
            cursor-pointer
            h-full
            aspect-square
            rounded="1/2"
            contrast="hover:120"
            brightness="hover:110"
          />
          <UserAvatar v-else :user="currentUser" h="full" />
        </div>
        <div space-y-2>
          <UiFileInput
            v-bind="bind"
            v-model="avatarVModel"
            block
            :label="t('avatar.button')"
          />
          <UiButton
            type="button"
            variant="outlined"
            block
            w-full
            color-scheme="red"
            left-icon="trash"
          >
            {{ t('delete') }}
          </UiButton>
        </div>
      </div>
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
      id="signin-username"
      v-slot="{ on, bind }"
      name="username"
      :label="t('username.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signin-firstname"
      v-slot="{ on, bind }"
      name="firstname"
      :label="t('firstname.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signin-lastname"
      v-slot="{ on, bind }"
      name="lastname"
      :label="t('lastname.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="signin-bio"
      v-slot="{ on, bind }"
      name="bio"
      :label="t('bio.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
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
    "avatar": {
      "label": "Profile picture",
      "button": "Select a new photo"
    },
    "gender": {
      "label": "Gender"
    },
    "username": {
      "label": "Username"
    },
    "firstname": {
      "label": "First Name"
    },
    "lastname": {
      "label": "Last Name"
    },
    "bio": {
      "label": "Bio"
    },
    "errors": {
      "500": "Sorry, we are not able to update your profile at this time. Please try again later."
    }
  },
  "fr": {
    "avatar": {
      "label": "Photo de profil",
      "button": "Changer de photo"
    },
    "gender": {
      "label": "Genre"
    },
    "username": {
      "label": "Pseudo"
    },
    "firstname": {
      "label": "Prénom"
    },
    "lastname": {
      "label": "Nom"
    },
    "bio": {
      "label": "Description"
    },
    "errors": {
      "500": "Désolé, une erreur est survenue lors de la mise à jour de votre profil. Veuillez réessayer plus tard."
    }
  }
}
</i18n>
