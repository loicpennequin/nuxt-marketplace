import { createRouter } from './utils/create-router';
export { createContext } from './utils/create-context';

import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { accountRouter } from './routers/account';
import { trpcLog } from './utils/trpc-logger';
import { productRouter } from './routers/product';

export const router = createRouter()
  .middleware(async ({ path, next }) => {
    trpcLog(`[ TRPC ] - ${path}`);

    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    trpcLog(`[ TRPC ] - ${path} - END : ${durationMs}ms`);

    return result;
  })
  .merge('user.', userRouter)
  .merge('auth.', authRouter)
  .merge('account.', accountRouter)
  .merge('product.', productRouter);
