<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { UpdateProfileDto, updateProfileDto } from '~~/dtos/user.dto';
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
    refetch();
  }
});

const { handleSubmit, values, setFieldValue } = useForm<UpdateProfileDto>({
  validationSchema: toFormValidator(updateProfileDto),
  initialValues: {
    id: currentUser.value?.id as string,
    username: currentUser.value?.username,
    bio: currentUser.value?.bio
  }
});

const onSubmit = handleSubmit(values => updateProfile(values));
const submitErrorMessage = useSubmitError(error);

const { readAsDataURL } = useFileReader();
const avatarVModel = computed<any>({
  get: () => [],
  set: async (val: Blob[]) => {
    setFieldValue('avatarBase64', await readAsDataURL(val[0]));
  }
});
</script>

<template>
  <form v-if="currentUser" space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="update-profile-avatar"
      v-slot="{ bind }"
      name="avatarBase64"
      :label="t('avatar.label')"
    >
      <div grid grid-cols-2 items-center justify-items-center>
        <div h-30 justify-self-start>
          <img
            v-if="values.avatarBase64"
            :src="values.avatarBase64"
            cursor-pointer
            h-full
            aspect-square
            rounded="1/2"
          />
          <UserAvatar
            v-else-if="values.avatarBase64 === null"
            :user="{ ...currentUser, avatar: null }"
            h="full"
          />
          <UserAvatar v-else :user="currentUser" h="full" />
        </div>
        <div space-y-4>
          <UiFileInput
            v-bind="bind"
            v-model="avatarVModel"
            v-focus
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
            @click="setFieldValue('avatarBase64', null)"
          >
            {{ t('delete') }}
          </UiButton>
        </div>
      </div>
    </UiFormControl>

    <UiFormControl
      id="update-profile-username"
      v-slot="{ on, bind }"
      name="username"
      :label="t('username.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="update-profile-bio"
      v-slot="{ on, bind }"
      name="bio"
      :label="t('bio.label')"
    >
      <UiTextArea v-bind="bind" v-on="on" />
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
    "username": {
      "label": "Username"
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
    "username": {
      "label": "Pseudo"
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
