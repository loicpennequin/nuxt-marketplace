import { createUserDto, findUserByIdDto } from '~~/dtos/user.dto';
import { createRouter } from '../utils/create-router';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { computeNextUsernameTag } from '../utils/create-username-tag';
import { TRPCError } from '@trpc/server';
import crypto from 'crypto';
import { sendMail } from '../services/mail-service';
import slugify from 'slugify';

export const userRouter = createRouter()
  .query('me', {
    resolve({ ctx }) {
      return ctx.event.context.user as User;
    }
  })
  .query('findAll', {
    resolve({ ctx }) {
      return ctx.prisma.user.findMany();
    }
  })
  .query('findById', {
    input: findUserByIdDto,
    resolve({ ctx, input }) {
      return ctx.prisma.user.findUnique({ where: { id: input } });
    }
  })
  .mutation('create', {
    input: createUserDto,
    async resolve({ ctx, input: { password, email, ...dto } }) {
      const exists = await prisma.account.count({ where: { email: email } });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'EMAIL_ALREADY_EXISTS'
        });
      }

      const usernameTag = await computeNextUsernameTag(ctx, dto.username);
      const account = await ctx.prisma.account.create({
        data: {
          passwordHash: bcrypt.hashSync(password, 10),
          emailVerifyToken: crypto.randomBytes(20).toString('hex'),
          email,
          user: {
            create: {
              ...dto,
              slug: slugify(`${dto.username}#${usernameTag}`, { lower: true }),
              usernameTag: usernameTag
            }
          }
        },
        include: { user: true }
      });

      await sendMail({
        account,
        subject: `Daria - Account verification`,
        body: `<p>Hello ${account.user.username}, please <a target="_blank" href="http://localhost:3000/api/verify-email?input=${account.emailVerifyToken}">verify your account by clicking this link</a>`
      });

      return account.user;
    }
  });
