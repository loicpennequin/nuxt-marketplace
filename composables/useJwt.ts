import { Maybe } from '~~/utils/types';

export const useJwt = () => {
  const jwt = useState<Maybe<string>>('jwt');
  const headers = useClientHeaders();

  const setHeader = () => {
    if (jwt.value) {
      headers.value.authorization = `Bearer ${jwt.value}`;
    } else {
      delete headers.value.authorization;
    }
  };

  watch(jwt, setHeader, { immediate: true });

  return {
    jwt
  };
};
