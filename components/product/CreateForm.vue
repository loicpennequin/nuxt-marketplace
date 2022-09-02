<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { vFocus } from '@/directives/focus';
import { createProductDto, CreateProductDto } from '~~/dtos/product.dto';

const { t } = useI18n();

const {
  isLoading,
  mutate: createProduct,
  reset,
  error
} = useTrpcMutation('product.create', {
  onSuccess(data) {
    console.log(data);
  }
});
const { handleSubmit, values, setFieldValue } = useForm<CreateProductDto>({
  validationSchema: toFormValidator(createProductDto),
  // @ts-ignore price should be filled by user
  initialValues: {
    imagesBase64: [],
    title: '',
    description: ''
  }
});

const onSubmit = handleSubmit(values => createProduct(values));
const submitErrorMessage = useSubmitError(error);

const imagesVModel = computed<any>({
  get: () => values.imagesBase64,
  set: async (val: Blob[]) => {
    setFieldValue('imagesBase64', [
      ...values.imagesBase64,
      ...(await Promise.all(
        val.map(file => useFileReader().readAsDataURL(file))
      ))
    ]);
  }
});

const removeFile = (url: string) => {
  setFieldValue(
    'imagesBase64',
    values.imagesBase64.filter(image => image !== url)
  );
};
</script>

<template>
  <form space-y-5 @submit.prevent="onSubmit">
    <UiFormControl
      id="create-product-title"
      v-slot="{ on, bind }"
      name="title"
      :label="t('title.label')"
    >
      <UiTextInput v-focus v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="create-product-description"
      v-slot="{ on, bind }"
      name="description"
      :label="t('description.label')"
    >
      <UiTextInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="create-product-price"
      v-slot="{ on, bind }"
      name="price"
      :label="t('price.label')"
    >
      <UiNumberInput v-bind="bind" v-on="on" />
    </UiFormControl>

    <UiFormControl
      id="create-product-images"
      v-slot="{ bind }"
      name="imagesBase64"
      :label="t('images.label')"
    >
      <UiFileInput v-bind="bind" v-model="imagesVModel" block multiple />
      <div p-2 gap-3 grid grid-cols-2>
        <div v-for="url in values.imagesBase64" :key="url" relative>
          <button
            absolute
            top-0
            right-0
            p-1
            color-white
            bg-red-5
            rounded="1/2"
            @click="removeFile(url)"
          >
            <div h-full aspect-square i-ui-close />
          </button>
          <img :src="url" w-full aspect-square object-cover />
        </div>
      </div>
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
    "images": {
      "label": "Photos"
    },
    "title": {
      "label": "Title"
    },
    "description": {
      "label": "Description"
    },
    "price": {
      "label": "Price"
    }
  },
  "fr": {
    "images": {
      "label": "Photos"
    },
    "title": {
      "label": "Titre"
    },
    "description": {
      "label": "Description"
    },
    "price": {
      "label": "Prix"
    }
  }
}
</i18n>
