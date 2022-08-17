import prisma from '../../prisma/client';

export default defineEventHandler(() => {
  return prisma.user.findMany();
});
