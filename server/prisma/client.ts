import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

const initPrisma = () => {
  if (global.prisma) {
    console.log('Prisma already in global scope');
    return global.prisma;
  }

  const client = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query'
      }
    ]
  });

  client.$on('query' as any, (e: any) => {
    // console.log('[PRISMA] ------------');
    // console.log('[PRISMA] --- SQL: ' + e.query);
    // console.log('[PRISMA] --- Params: ' + e.params);
    // console.log('[PRISMA] --- Duration: ' + e.duration + 'ms');
  });

  client.$use(async (params, next) => {
    // console.log(`[PRISMA] - ${params.model}.${params.action} - START`);
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();

    console.log(
      chalk.magenta('[PRISMA]'),
      ' - ',
      `${params.model}.${params.action} - ${after - before}ms`
    );
    return result;
  });

  return client;
};

const prisma: PrismaClient = global.prisma || initPrisma();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
