import * as trpc from '@trpc/client';
import { unref } from 'vue';
import { defineNuxtPlugin, useRequestHeaders } from '#app';
import type { router } from '~/server/trpc';

declare type AppRouter = typeof router;

export default defineNuxtPlugin(nuxtApp => {
  const headers = useRequestHeaders();

  const client = trpc.createTRPCClient<AppRouter>({
    url: `http://localhost:3000/trpc`,
    headers: () => {
      const otherHeaders = useClientHeaders();

      return {
        ...unref(otherHeaders),
        ...headers
      };
    },
    fetch(...args: [any, any]) {
      return globalThis.$fetch.raw(...args).then(response => ({
        ...response,
        json: () => response._data
      }));
    }
  });

  nuxtApp.provide('client', client);
});

declare module '#app' {
  interface NuxtApp {
    $client: trpc.TRPCClient<AppRouter>;
  }
}
