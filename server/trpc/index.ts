import bcrypt from 'bcrypt';
import { createUserDto, findUserByIdDto } from '~~/dtos/user.dto';
import { OnErrorPayload } from 'trpc-nuxt/api';
import { createRouter } from './utils/create-router';
export { createContext } from './utils/create-context';

import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';

export const router = createRouter()
  .merge('user.', userRouter)
  .merge('auth.', authRouter);

export const onError = (payload: OnErrorPayload<typeof router>) => {
  console.log('TRPC ERROR', payload.error);
};
