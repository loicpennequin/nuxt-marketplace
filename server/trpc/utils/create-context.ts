import { verifyJwt } from '~~/utils/helpers/tokens';
import prisma from '../../prisma/client';
import { CompatibilityEvent } from 'h3';

export type TrpcContext = {
  event: CompatibilityEvent;
  prisma: typeof prisma;
};

export const createContext = async (
  event: CompatibilityEvent
): Promise<TrpcContext> => {
  console.log(`[ TRPC ] - ${event.req.url?.split('/').reverse()[0]}`);
  if (event.req.headers instanceof Headers) {
    event.req.headers = Object.fromEntries(event.req.headers.entries());
  }

  try {
    const { authorization } = event.req.headers;
    if (authorization) {
      const jwt = verifyJwt(authorization.replace('Bearer ', ''));

      event.context.user = await prisma.user.findUnique({
        where: { id: jwt.payload.sub as string }
      });
    }
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 401,
      statusMessage: 'Malformed or expired access token.'
    });
  }

  return {
    event,
    prisma
  };
};
