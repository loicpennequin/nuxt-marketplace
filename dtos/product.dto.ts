import { z } from 'zod';
import {
  PRODUCT_MAX_PRICE,
  PRODUCT_MIN_PRICE
} from '~~/utils/constants/product.constants';

export const createProductDto = z.object({
  imagesBase64: z.string().array().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  price: z.number().min(PRODUCT_MIN_PRICE).max(PRODUCT_MAX_PRICE)
});
export type CreateProductDto = z.infer<typeof createProductDto>;

export const findAllProductsBySellerIdDto = z.string();
export type FindAllProductsBySellerIdDto = z.infer<
  typeof findAllProductsBySellerIdDto
>;
