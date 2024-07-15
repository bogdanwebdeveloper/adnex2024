import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
  const { postId } = params;

  const post = await prisma.form.findUnique({
    where: { id: postId }
  });

  if (!post) {
    return {
      status: 404,
      error: new Error('Post not found')
    };
  }

  return {
    post
  };
};
