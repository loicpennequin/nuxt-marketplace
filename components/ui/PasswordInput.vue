<script setup lang="ts">
import { Field } from 'vee-validate';

const props = defineProps<{ name: string }>();
</script>

<template>
  <Field :name="props.name" bg-light-3 dark:bg-dark-3 p-2 block w-full />
</template>
