import type { Gender as PrismaGender } from '@prisma/client';

//We need to map all prisma enums to objects so they can be safely imported into client side code
// Otherwise this will break the build by importing the WHOLE Prisma client client side
// see https://github.com/prisma/prisma/issues/12504

export const Gender: { [k in PrismaGender]: k } = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
} as const;

export type Gender = PrismaGender;
