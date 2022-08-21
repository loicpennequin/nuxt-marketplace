import { z } from 'zod';

export const loginDto = z.object({
  email: z.string().trim().min(1, 'form.errors.required'),
  password: z.string().trim().min(1, 'form.errors.required')
});

export type LoginDto = z.infer<typeof loginDto>;
