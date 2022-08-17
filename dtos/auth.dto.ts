import { z } from 'zod';

export const loginDto = z.object({
  email: z.string(),
  password: z.string()
});

export type LoginDto = z.infer<typeof loginDto>;
