import { verifyJwt } from '~~/utils/helpers/tokens';
import prisma from '../prisma/client';

export default defineEventHandler(async event => {
  if (!event.req.url?.startsWith('/api')) return;
  const { authorization } = event.req.headers;
  if (!authorization) return;

  try {
    const jwt = verifyJwt(authorization.replace('Bearer ', ''));

    event.context.user = await prisma.user.findUnique({
      where: { id: jwt.payload.sub as string }
    });
  } catch (err) {
    console.error(err);
    return createError({
      statusCode: 401,
      statusMessage: 'Malformed or expired access token.'
    });
  }
});
