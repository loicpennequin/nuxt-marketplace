import * as trpc from '@trpc/client';
import { unref } from 'vue';
import { useClientHeaders } from '@/composables/trpc';
import { defineNuxtPlugin, useRequestHeaders } from '#app';
import type { router } from '~/server/trpc';

declare type AppRouter = typeof router;

export default defineNuxtPlugin(nuxtApp => {
  const headers = useRequestHeaders();
  const otherHeaders = useClientHeaders();

  const client = trpc.createTRPCClient<AppRouter>({
    url: `http://localhost:3000/trpc`,
    headers: () => {
      return {
        ...unref(otherHeaders),
        ...headers
      };
    }
  });

  nuxtApp.provide('client', client);
});

declare module '#app' {
  interface NuxtApp {
    $client: trpc.TRPCClient<AppRouter>;
  }
}
