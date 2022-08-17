import prisma from '../../prisma/client';

export default defineEventHandler(event => {
  return prisma.user.findUnique({ where: { id: event.context.params.id } });
});
