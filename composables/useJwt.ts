import jwtDecode from 'jwt-decode';
import { Maybe } from '~~/utils/types';

export const useJwt = () => {
  const jwt = useState<Maybe<string>>('jwt');
  const decodedJwt = computed(() => jwt.value && jwtDecode<any>(jwt.value));

  return {
    jwt,
    decodedJwt
  };
};
