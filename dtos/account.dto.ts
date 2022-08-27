import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '~~/utils/constants/user.contants';

export const sendPasswordResetEmailDto = z.object({
  email: z.string().email()
});
export type SendPasswordResetEmailDto = z.infer<
  typeof sendPasswordResetEmailDto
>;

export const resetPasswordDto = z.object({
  token: z.string(),
  password: z.string()
});
export type ResetPasswordDto = z.infer<typeof resetPasswordDto>;

export const updateAccountDto = z.object({
  userId: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  firstname: z.string().trim().optional().nullish(),
  lastname: z.string().trim().optional().nullish(),
  password: z.string().min(PASSWORD_MIN_LENGTH).optional(),
  phoneNumber: z.string().optional().nullish(),
  phoneCountryCode: z.string().optional().nullish()
});
export type UpdateAccountDto = z.infer<typeof updateAccountDto>;
