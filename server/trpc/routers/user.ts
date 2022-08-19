import { createUserDto, findUserByIdDto } from '~~/dtos/user.dto';
import { createRouter } from '../utils/create-router';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

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
  });
