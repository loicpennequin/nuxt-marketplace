import crypto from 'crypto';
import { createRouter } from '../utils/create-router';
import { sendMail } from '../services/mail-service';
import {
  resetPasswordDto,
  sendPasswordResetEmailDto,
  updateAccountDto
} from '~~/dtos/account.dto';
import bcrypt from 'bcrypt';

export const accountRouter = createRouter()
  .mutation('sendPasswordresetMail', {
    input: sendPasswordResetEmailDto,
    async resolve({ ctx, input }) {
      const account = await ctx.prisma.account.findFirst({
        where: { email: input.email },
        include: { user: true }
      });

      if (!account) return;
      const passwordResetToken = crypto.randomBytes(20).toString('hex');

      await ctx.prisma.account.update({
        where: { id: account.id },
        data: {
          passwordResetToken
        }
      });

      await sendMail({
        account,
        subject: `Daria - Password reset`,
        body: `<p>Hello ${account.user.username}, please <a target="_blank" href="http://localhost:3000/reset-password?token=${passwordResetToken}">follow this link to reset your password</a>.`
      });
    }
  })
  .mutation('resetPassword', {
    input: resetPasswordDto,
    async resolve({ ctx, input }) {
      const account = await ctx.prisma.account.findFirst({
        where: { passwordResetToken: input.token }
      });

      if (!account) return;
      await ctx.prisma.account.update({
        where: { id: account.id },
        data: {
          passwordResetToken: null,
          passwordHash: bcrypt.hashSync(input.password, 10)
        }
      });

      return true;
    }
  })
  .mutation('updateAccount', {
    input: updateAccountDto,
    resolve({ ctx, input }) {
      return ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          gender: input.gender,
          firstname: input.firstname,
          lastname: input.lastname,
          account: {
            update: {
              passwordHash: input.password
                ? bcrypt.hashSync(input.password, 10)
                : undefined,
              phoneNumber: input.phoneNumber,
              phoneCountryCode: input.phoneCountryCode
            }
          }
        }
      });
    }
  });
