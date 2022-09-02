<script setup lang="ts">
import { Product, User, Media } from '@prisma/client';

type ProductWithMediaAndSeller = Product & { images: Media[]; seller: User };
const props = defineProps<{ product: ProductWithMediaAndSeller }>();

const { routes } = useTypedRouter();
</script>

<template>
  <UiSurface is="li" space-y-2 p="0">
    <div grid class="product-media" overflow-hidden>
      <img
        :src="props.product.images[0].url"
        col-start-1
        col-end="-1"
        row-start-1
        row-end="-1"
        w-full
        aspect="7/10"
        object-cover
        bg="white"
        scale="hover:110"
        transition-transform
        duration="200"
      />

      <AppLink
        col-start-1
        row-start-1
        m-1
        :to="{
          name: routes['profile-Slug'],
          params: { slug: product.seller.slug }
        }"
        no-underline
        color="inherit hover:brand-5"
        isolate
      >
        <UiSurface p="x-2 y-1" flex gap-2 items-center rounded="full" text-sm>
          <UserAvatar :user="product.seller" h="7" />
          {{ product.seller.username }}
        </UiSurface>
      </AppLink>
    </div>
    <div p="x-3 y-2" flex>
      <div>{{ props.product.title }}</div>
      <div m-l-auto text-xl>{{ props.product.price }}€</div>
    </div>
  </UiSurface>
</template>

<style scoped>
.product-media {
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
}
</style>
