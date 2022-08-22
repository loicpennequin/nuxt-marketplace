import { z } from 'zod';

export const loginDto = z.object({
  email: z.string().trim().min(1),
  password: z.string().trim().min(1)
});

export type LoginDto = z.infer<typeof loginDto>;
