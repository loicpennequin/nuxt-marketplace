import { TrpcContext } from '~~/server/trpc/utils/create-context';
import { createUsernameTag } from '~~/utils/helpers/username-tag';

export const computeNextUsernameTag = async (
  ctx: TrpcContext,
  username: string
) => {
  const users = await ctx.prisma.user.findMany({
    select: { usernameTag: true },
    where: { username }
  });

  return createUsernameTag(users.map(u => parseInt(u.usernameTag, 10)));
};
