import { CompatibilityEvent } from 'h3';
import { ZodObject, z } from 'zod';

export const validateBody = async <
  TValidator extends ZodObject<any>,
  TReturn = z.infer<TValidator>
>(
  event: CompatibilityEvent,
  validator: TValidator,
  { message = 'Validation Error' } = {}
): Promise<TReturn> => {
  const result = validator.safeParse(await useBody(event));

  if (!result.success) {
    console.error(result.error);
    throw createError({
      statusCode: 400,
      statusMessage: message,
      data: result.error
    });
  }
  return result.data as TReturn;
};
