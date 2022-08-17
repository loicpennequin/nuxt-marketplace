import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from '~~/utils/constants/user.contants';

export const createUserDto = z.object({
  username: z.string().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH).trim(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  email: z.string().email().trim()
});
export type CreateUserDto = z.infer<typeof createUserDto>;

export const findUserByIdDto = z.string();
export type FindUserByIdDto = z.infer<typeof findUserByIdDto>;
