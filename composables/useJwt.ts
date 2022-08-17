import { FetchOptions } from 'ohmyfetch';
import jwtDecode from 'jwt-decode';

export const useJwt = () => {
  const jwt = useState<string>('jwt');
  const decodedJwt = computed(() => jwt.value && jwtDecode<any>(jwt.value));

  const jwtInterceptor: FetchOptions['onRequest'] = async ({ options }) => {
    if (!jwt.value) return;
    const jwtHeader = `Bearer ${jwt.value}`;
    if (!options.headers) options.headers = {};

    if (Array.isArray(options.headers)) {
      options.headers.push(['authorization', jwtHeader]);
    } else if (options.headers instanceof Headers) {
      options.headers.set('authorization', jwtHeader);
    } else options.headers.authorization = jwtHeader;
  };

  return {
    jwt,
    decodedJwt,
    jwtInterceptor
  };
};
