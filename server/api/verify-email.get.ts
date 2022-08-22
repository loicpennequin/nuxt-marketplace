import { generateRefreshToken } from '~~/utils/helpers/tokens';
import prisma from '../prisma/client';
import { getQuery } from 'h3';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  if (!query.input) {
    return createError({
      statusCode: 400,
      statusMessage: 'Error while verifying email'
    });
  }

  const account = await prisma.account.findFirst({
    where: { emailVerifyToken: query.input as string }
  });
  if (!account) {
    return createError({
      statusCode: 400,
      statusMessage: 'Error while verifying email'
    });
  }

  const refreshToken = generateRefreshToken();

  await prisma.account.update({
    where: { id: account.id },
    data: {
      emailVerified: true,
      emailVerifyToken: null,
      refreshToken
    }
  });

  setCookie(event, 'refresh_token', refreshToken, {
    secure: false,
    sameSite: 'lax',
    maxAge: 604800000,
    httpOnly: true
  });
  sendRedirect(event, 'http://localhost:3000');

  return '<p>Redirecting...</p>';
});
