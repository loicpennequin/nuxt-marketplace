import * as trpc from '@trpc/server';
import { CompatibilityEvent } from 'h3';
import bcrypt from 'bcrypt';
import { createUserDto, findUserByIdDto } from '~~/dtos/user.dto';
import { loginDto } from '~~/dtos/auth.dto';
import { generateJWT, generateRefreshToken } from '~~/utils/helpers/tokens';
import { OnErrorPayload } from 'trpc-nuxt/api';

type Context = {
  event: CompatibilityEvent;
  prisma: typeof prisma;
};

export const router = trpc
  .router<Context>()
  .query('findAllUsers', {
    resolve({ ctx }) {
      return ctx.prisma.user.findMany();
    }
  })
  .query('findUserById', {
    input: findUserByIdDto,
    resolve({ ctx, input }) {
      return ctx.prisma.user.findUnique({ where: { id: input } });
    }
  })
  .mutation('register', {
    input: createUserDto,
    async resolve({ ctx, input }) {
      const account = await ctx.prisma.account.create({
        data: {
          user: {
            create: {
              username: input.username,
              email: input.email,
              passwordHash: bcrypt.hashSync(input.password, 10)
            }
          }
        },
        include: { user: true }
      });

      return account.user;
    }
  })
  .mutation('login', {
    input: loginDto,
    async resolve({ ctx, input }) {
      const user = await prisma.user.findUnique({
        where: { email: input.email }
      });

      if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
      }

      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.passwordHash
      );
      if (!isPasswordValid) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
      }

      const tokens = {
        accessToken: generateJWT(user.id),
        refreshToken: generateRefreshToken()
      };

      setCookie(ctx.event, 'refresh_token', tokens.refreshToken, {
        secure: false,
        sameSite: true,
        maxAge: 604800000,
        httpOnly: true
      });

      await ctx.prisma.account.update({
        where: { userId: user.id },
        data: { refreshToken: tokens.refreshToken }
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
        throw createError({
          statusCode: 401,
          statusMessage: 'Bad Credentials.'
        });
      }

      const account = await ctx.prisma.account.findFirst({
        where: { refreshToken },
        include: { user: true }
      });

      if (!account) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Bad Credentials.'
        });
      }

      const tokens = {
        accessToken: generateJWT(account.user.id),
        refreshToken: generateRefreshToken()
      };

      setCookie(ctx.event, 'refresh_token', tokens.refreshToken);

      await ctx.prisma.account.update({
        where: { id: account.id },
        data: { refreshToken: tokens.refreshToken }
      });

      return { accessToken: tokens.accessToken };
    }
  });

export const createContext = (event: CompatibilityEvent) => {
  if (event.req.headers instanceof Headers) {
    event.req.headers = Object.fromEntries(event.req.headers.entries());
  }
  return {
    event,
    prisma
  };
};

export const onError = (payload: OnErrorPayload<typeof router>) => {
  console.log('TRPC ERROR', payload.error);
};
