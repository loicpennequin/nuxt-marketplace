import {
  createProductDto,
  findAllProductsBySellerIdDto
} from '~~/dtos/product.dto';
import { uploadImage } from '../services/file-upload';
import { createRouter } from '../utils/create-router';

export const productRouter = createRouter()
  .query('findAllBySellerId', {
    input: findAllProductsBySellerIdDto,
    resolve({ ctx, input }) {
      return ctx.prisma.product.findMany({
        where: { sellerId: input },
        include: { images: true, seller: true }
      });
    }
  })
  .mutation('create', {
    input: createProductDto,
    async resolve({ ctx, input: { imagesBase64, ...dto } }) {
      const images = await Promise.all(
        imagesBase64.map(async imageBase64 => ({
          url: (await uploadImage(imageBase64)).url
        }))
      );

      return ctx.prisma.product.create({
        data: {
          ...dto,
          sellerId: ctx.event.context.user.id,
          images: {
            create: images
          }
        }
      });
    }
  });
