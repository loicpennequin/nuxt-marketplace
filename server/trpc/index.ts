import { createRouter } from './utils/create-router';
export { createContext } from './utils/create-context';

import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { accountRouter } from './routers/account';

export const router = createRouter()
  .merge('user.', userRouter)
  .merge('auth.', authRouter)
  .merge('account.', accountRouter);
