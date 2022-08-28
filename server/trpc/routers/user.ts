import {
  createUserDto,
  findUserByIdDto,
  findUserBySlugDto,
  updateProfileDto
} from '~~/dtos/user.dto';
import { createRouter } from '../utils/create-router';
import bcrypt from 'bcrypt';
import { computeNextUsernameTag } from '../utils/create-username-tag';
import { TRPCError } from '@trpc/server';
import crypto from 'crypto';
import { sendMail } from '../services/mail-service';
import slugify from 'slugify';
import { uploadImage } from '../services/file-upload';

export const userRouter = createRouter()
  .query('me', {
    resolve({ ctx }) {
      return ctx.prisma.user.findUnique({
        where: { id: ctx.event.context.user.id },
        include: { avatar: true, account: true }
      });
    }
  })
  .query('findAll', {
    resolve({ ctx }) {
      return ctx.prisma.user.findMany({
        where: { account: { emailVerified: true } },
        include: { avatar: true }
      });
    }
  })
  .query('findById', {
    input: findUserByIdDto,
    resolve({ ctx, input }) {
      return ctx.prisma.user.findUnique({ where: { id: input } });
    }
  })
  .query('findBySlug', {
    input: findUserBySlugDto,
    resolve({ ctx, input }) {
      return ctx.prisma.user.findFirst({
        where: { slug: input },
        include: { avatar: true }
      });
    }
  })
  .mutation('create', {
    input: createUserDto,
    async resolve({ ctx, input: { password, email, ...dto } }) {
      const exists = await prisma.account.count({ where: { email } });

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
  })
  .mutation('updateProfile', {
    input: updateProfileDto,
    async resolve({ ctx, input: { id, avatarBase64, ...dto } }) {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND'
        });
      }

      const [avatar, usernameTag] = await Promise.all([
        avatarBase64
          ? prisma.media.create({
              data: {
                userId: user.id,
                url: (await uploadImage(avatarBase64)).url
              }
            })
          : undefined,
        dto.username ? computeNextUsernameTag(ctx, dto.username) : user.username
      ]);

      return ctx.prisma.user.update({
        where: { id },
        data: {
          ...dto,
          slug: slugify(`${dto.username}#${usernameTag}`, { lower: true }),
          avatarId: avatar?.id ?? avatarBase64,
          usernameTag
        }
      });
    }
  });
