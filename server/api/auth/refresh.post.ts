import prisma from '@/server/prisma/client';
import { generateJWT, generateRefreshToken } from '~~/utils/helpers/tokens';
import { getCookie, setCookie } from 'h3';

export default defineEventHandler(async event => {
  const refreshToken = getCookie(event, 'refresh_token');
  if (!refreshToken) {
    return createError({ statusCode: 401, statusMessage: 'Bad Credentials.' });
  }

  const account = await prisma.account.findFirst({
    where: { refreshToken },
    include: { user: true }
  });
  if (!account) {
    return createError({ statusCode: 401, statusMessage: 'Bad Credentials.' });
  }

  const tokens = {
    accessToken: generateJWT(account.user.id),
    refreshToken: generateRefreshToken()
  };

  setCookie(event, 'refresh_token', tokens.refreshToken);

  await prisma.account.update({
    where: { id: account.id },
    data: { refreshToken: tokens.refreshToken }
  });

  return { accessToken: tokens.accessToken };
});
