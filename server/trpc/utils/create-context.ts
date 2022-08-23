import { verifyJwt } from '~~/utils/helpers/tokens';
import prisma from '../../prisma/client';
import { CompatibilityEvent } from 'h3';
import { TRPCError } from '@trpc/server';

export type TrpcContext = {
  event: CompatibilityEvent;
  prisma: typeof prisma;
};

const normalizeRequestHeaders = (headers: any) => {
  if (headers instanceof Headers) {
    // when the function is called directly from a $fetch called server side, the headers are an instanfe of Headers
    // we need to normalize them to a plain object
    return Object.fromEntries(headers.entries());
  }

  return headers;
};

export const createContext = async (
  event: CompatibilityEvent
): Promise<TrpcContext> => {
  try {
    event.req.headers = normalizeRequestHeaders(event.req.headers);

    const { authorization } = event.req.headers;
    if (authorization) {
      const jwt = verifyJwt(authorization.replace('Bearer ', ''));

      event.context.user = await prisma.user.findUnique({
        where: { id: jwt.payload.sub as string }
      });
    }
  } catch (err) {
    console.error(err);
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return {
    event,
    prisma
  };
};
