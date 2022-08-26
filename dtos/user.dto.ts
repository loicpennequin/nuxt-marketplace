import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from '~~/utils/constants/user.contants';

export const createUserDto = z.object({
  username: z.string().trim().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  email: z.string().email().trim(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'])
});
export type CreateUserDto = z.infer<typeof createUserDto>;

export const updateProfileDto = z.object({
  id: z.string(),
  username: z
    .string()
    .trim()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .optional(),
  bio: z.string().trim().optional().nullish(),
  avatarBase64: z.string().optional().nullish()
});
export type UpdateProfileDto = z.infer<typeof updateProfileDto>;

export const findUserByIdDto = z.string();
export type FindUserByIdDto = z.infer<typeof findUserByIdDto>;

export const findUserBySlugDto = z.string();
export type FindUserBySlugDto = z.infer<typeof findUserBySlugDto>;
