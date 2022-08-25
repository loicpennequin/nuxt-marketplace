<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});

const files = ref<Blob[]>([]);
const fileUrls = computed(() =>
  files.value?.map(file => URL.createObjectURL(file))
);
const vModel = computed({
  get: () => files.value,
  set(val) {
    files.value.push(...val);
  }
});
const removeFile = (index: number) => {
  files.value.splice(index, 1);
};

const upload = async () => {
  if (!files.value) return;
  const promises = files.value?.map(file => {
    const formData = new FormData();
    formData.append('file', file);

    return $fetch('/api/file-upload', {
      method: 'POST',
      body: formData
    });
  });

  return Promise.all(promises);
};

const {
  mutate: uploadFiles,
  isError,
  isSuccess,
  isLoading
} = useMutation(['file-upload'], upload);
</script>

<template>
  <UiContainer>
    <UiSurface>
      <UiFileInput v-model="vModel" multiple />
      <div p-2 flex flex-wrap gap-3>
        <div v-for="(url, index) in fileUrls" :key="url" relative>
          <button
            absolute
            top-0
            right-0
            p-1
            color-white
            bg-red-5
            rounded="1/2"
            @click="removeFile(index)"
          >
            <div h-full aspect-square i-ui-close />
          </button>
          <img :src="url" h-8rem aspect-square />
        </div>
      </div>
      <UiButton
        :is-loading="isLoading"
        :disabled="!files?.length"
        @click="uploadFiles()"
      >
        Upload
      </UiButton>
      <div v-if="isError">File upload failed</div>
      <div v-if="isSuccess">File upload successful</div>
    </UiSurface>
  </UiContainer>
</template>
