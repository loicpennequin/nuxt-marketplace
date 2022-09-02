<script setup lang="ts">
import { User } from '@prisma/client';

const props = defineProps<{ user: User }>();
const {
  data: products,
  isLoading,
  suspense
} = useTrpcQuery(['product.findAllBySellerId', props.user.id]);

onServerPrefetch(suspense);
</script>

<template>
  <UiSurface v-if="isLoading" flex justify-center><UiSpinner /></UiSurface>
  <ul v-else-if="products" grid grid-cols="2 sm:3 md:5" gap-3>
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>
