import { loginDto } from '~~/dtos/auth.dto';
import { createRouter } from '../utils/create-router';
import bcrypt from 'bcrypt';
import { generateJWT, generateRefreshToken } from '~~/utils/helpers/tokens';
import { TRPCError } from '@trpc/server';

export const authRouter = createRouter()
  .mutation('login', {
    input: loginDto,
    async resolve({ ctx, input }) {
      const account = await ctx.prisma.account.findUnique({
        where: { email: input.email }
      });

      if (!account) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const isPasswordValid = await bcrypt.compare(
        input.password,
        account.passwordHash
      );
      if (!isPasswordValid) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const tokens = {
        accessToken: generateJWT(account.userId),
        refreshToken: generateRefreshToken()
      };

      await ctx.prisma.account.update({
        where: { id: account.id },
        data: {
          refreshToken: tokens.refreshToken,
          user: { update: { lastOnlineAt: new Date() } }
        }
      });

      setCookie(ctx.event, 'refresh_token', tokens.refreshToken, {
        secure: false,
        sameSite: true,
        maxAge: 604800000,
        httpOnly: true
      });

      return { accessToken: tokens.accessToken };
    }
  })
  .mutation('logout', {
    async resolve({ ctx }) {
      if (!ctx.event.context.user) return;
      await prisma.user.update({
        where: {
          id: ctx.event.context.user.id
        },
        data: {
          account: {
            update: {
              refreshToken: null
            }
          }
        }
      });

      deleteCookie(ctx.event, 'refresh_token');
    }
  })
  .mutation('refreshToken', {
    async resolve({ ctx }) {
      const refreshToken = getCookie(ctx.event, 'refresh_token');

      if (!refreshToken) {
        console.error('no refresh token - skipping');
        return { accessToken: null };
      }

      const account = await ctx.prisma.account.findFirst({
        select: { userId: true, id: true },
        where: { refreshToken }
      });

      if (!account) {
        console.error('invalid refreshToken', refreshToken);
        deleteCookie(ctx.event, 'refresh_token');
        return { accessToken: null };
      }

      const tokens = {
        accessToken: generateJWT(account.userId),
        refreshToken: generateRefreshToken()
      };

      setCookie(ctx.event, 'refresh_token', tokens.refreshToken);

      await ctx.prisma.account.update({
        where: { id: account.id },
        data: {
          refreshToken: tokens.refreshToken,
          user: { update: { lastOnlineAt: new Date() } }
        }
      });

      return { accessToken: tokens.accessToken };
    }
  });
