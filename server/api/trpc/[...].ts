import { createTRPCHandler } from '@/server/trpc/utils/create-handler';
import * as functions from '@/server/trpc';

export default createTRPCHandler({
  ...functions,
  endpoint: '/api/trpc'
});
