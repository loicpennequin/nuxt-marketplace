import { FetchOptions, FetchContext } from 'ohmyfetch';
import type { NitroFetchRequest } from 'nitropack';

export type HttpOptions = Omit<
  FetchOptions,
  'onRequest' | 'onRequestError' | 'onResponse' | 'onResponseError'
>;

let http: typeof $fetch;

export const useHttp = () => {
  const { jwtInterceptor } = useJwt();

  if (!http) {
    //@ts-ignore
    http = $fetch.create({
      async onRequest(ctx: FetchContext) {
        await jwtInterceptor?.(ctx);
      }
    }) as typeof $fetch;
  }

  return {
    raw<T extends NitroFetchRequest>(url: T, options: HttpOptions = {}) {
      return http.raw<unknown, T>(url, options);
    },

    get<T extends NitroFetchRequest>(url: T, options: HttpOptions = {}) {
      return http<unknown, T>(url, { ...options, method: 'get' });
    },

    post<T extends NitroFetchRequest>(url: T, options: HttpOptions = {}) {
      return http<unknown, T>(url, { ...options, method: 'post' });
    },

    put<T extends NitroFetchRequest>(url: T, options: HttpOptions = {}) {
      return http<unknown, T>(url, { ...options, method: 'put' });
    },

    delete<T extends NitroFetchRequest>(url: T, options: HttpOptions = {}) {
      return http<unknown, T>(url, { ...options, method: 'delete' });
    }
  };
};
