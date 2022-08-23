import { generateRefreshToken } from '~~/utils/helpers/tokens';
import prisma from '../prisma/client';
import { getQuery } from 'h3';

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event);
    if (!query.input) throw new Error();

    const account = await prisma.account.findFirst({
      where: { emailVerifyToken: query.input as string }
    });
    if (!account) throw new Error();

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
      sameSite: 'lax', // Strict samesite won't login the user when coming from the confirmation email
      maxAge: 604800000,
      httpOnly: true
    });
    sendRedirect(event, 'http://localhost:3000/email-confirm/success');

    return '<p>Redirecting...</p>';
  } catch (err) {
    sendRedirect(event, 'http://localhost:3000/email-confirm/error');
  }
});
