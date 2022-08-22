import { createRouter } from './utils/create-router';
export { createContext } from './utils/create-context';

import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';

export const router = createRouter()
  .merge('user.', userRouter)
  .merge('auth.', authRouter);
