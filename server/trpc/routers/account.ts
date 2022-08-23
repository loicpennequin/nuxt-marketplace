import crypto from 'crypto';
import { createRouter } from '../utils/create-router';
import { sendMail } from '../services/mail-service';
import {
  resetPasswordDto,
  sendPasswordResetEmailDto
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
        subject: `Yarilo - Password reset`,
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
  });
