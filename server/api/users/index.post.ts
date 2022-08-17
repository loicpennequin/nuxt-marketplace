import bcrypt from 'bcrypt';
import { createUserDto } from '~~/dtos/user.dto';
import { validateBody } from '~~/utils/helpers/validate-body';
import prisma from '../../prisma/client';

export default defineEventHandler(async event => {
  const data = await validateBody(event, createUserDto);

  const account = await prisma.account.create({
    data: {
      user: {
        create: {
          username: data.username,
          email: data.email,
          passwordHash: bcrypt.hashSync(data.password, 10)
        }
      }
    },
    include: { user: true }
  });

  return account.user;
});
