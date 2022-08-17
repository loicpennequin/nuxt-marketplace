import bcrypt from 'bcrypt';
import prisma from '../../prisma/client';
import { loginDto } from '~~/dtos/auth.dto';
import { validateBody } from '~~/utils/helpers/validate-body';
import { generateJWT, generateRefreshToken } from '~~/utils/helpers/tokens';
import { setCookie } from 'h3';

export default defineEventHandler(async event => {
  const dto = await validateBody(event, loginDto);
  const user = await prisma.user.findUnique({ where: { email: dto.email } });

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const tokens = {
    accessToken: generateJWT(user.id),
    refreshToken: generateRefreshToken()
  };

  setCookie(event, 'refresh_token', tokens.refreshToken, {
    secure: false,
    sameSite: true,
    maxAge: 604800000,
    httpOnly: true
  });

  await prisma.account.update({
    where: { userId: user.id },
    data: { refreshToken: tokens.refreshToken }
  });

  return { accessToken: tokens.accessToken };
});
