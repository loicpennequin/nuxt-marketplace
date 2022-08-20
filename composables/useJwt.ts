import jwtDecode from 'jwt-decode';
import { Maybe } from '~~/utils/types';

type DecodedJWT = {
  sub: string;
  exp: number;
  iat: number;
};
export const useJwt = () => {
  const jwt = useState<Maybe<string>>('jwt');
  const decodedJwt = computed(
    () => jwt.value && jwtDecode<DecodedJWT>(jwt.value)
  );

  return {
    jwt,
    decodedJwt
  };
};
