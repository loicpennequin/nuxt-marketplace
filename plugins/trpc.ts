import * as trpc from '@trpc/client';
import { unref } from 'vue';
import { defineNuxtPlugin, useRequestHeaders } from '#app';
import type { router } from '~/server/trpc';
import { FetchError } from 'ohmyfetch';

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
    async fetch(...args: [any, any]) {
      try {
        const response = await $fetch.raw(...args);
        return {
          ...response,
          json: () => response._data
        };
      } catch (err: any) {
        if (err instanceof FetchError) {
          return { json: () => err.data } as Response;
        }
        throw err;
      }
    }
  });

  nuxtApp.provide('client', client);
});

declare module '#app' {
  interface NuxtApp {
    $client: trpc.TRPCClient<AppRouter>;
  }
}
