import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const generateJWT = (userId: string) => {
  const config = useRuntimeConfig();
  return jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: 15 * 60 // 15min,
  });
};

export const verifyJwt = (token: string) => {
  const config = useRuntimeConfig();

  return jwt.verify(token, config.jwtSecret, {
    complete: true,
    ignoreExpiration: false
  });
};

export const generateRefreshToken = () => {
  const config = useRuntimeConfig();
  return jwt.sign(
    { sub: crypto.randomBytes(20).toString('hex') },
    config.refreshTokenSecret,
    {
      expiresIn: 7 * 24 * 60 * 60 // 1 week,
    }
  );
};
