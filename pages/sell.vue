<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});

const onUploadClick = async () => {
  const { data, open } = useFileSystemAccess({
    dataType: 'Blob',
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.jpeg', '.jpg']
        }
      }
    ]
  });
  await open();
  if (!data.value) return;
  upload(data.value);
};

const onDrop = (files: File[] | null) => {
  if (!files) return;
  const [file] = files;
  upload(file);
};

const buttonComponentRef = ref<any>();
const buttonRef = computed(() => unrefElement(buttonComponentRef));
const { isOverDropZone } = useDropZone(buttonRef, onDrop);

const upload = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await $fetch('/api/file-upload', {
    method: 'POST',
    body: formData
  });

  console.log(response);
};
</script>

<template>
  <UiContainer>
    <UiSurface>
      <UiButton
        ref="buttonComponentRef"
        v-bind="isOverDropZone && { bg: 'brand-6' }"
        @click="onUploadClick"
      >
        Click to select or drop a file
      </UiButton>
    </UiSurface>
  </UiContainer>
</template>
