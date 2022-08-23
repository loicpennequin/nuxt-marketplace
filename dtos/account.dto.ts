import { z } from 'zod';

export const sendPasswordResetEmailDto = z.string().email();
export type SendPasswordResetEmailDto = z.infer<
  typeof sendPasswordResetEmailDto
>;

export const resetPasswordDto = z.object({
  token: z.string(),
  password: z.string()
});
export type ResetPasswordDto = z.infer<typeof resetPasswordDto>;
