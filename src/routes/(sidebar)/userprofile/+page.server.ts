import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ cookies }) => {
  const session = cookies.get('session');
  if (!session) {
    return fail(401, { error: 'Unauthorized' });
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session },
  });
  // Fetch the relations that correspond to the userId (session)
  const relations = await prisma.relation.findMany({
    where: { userId: `${session}` },
  });

  // Extract postIds from the relations
  const postIds = relations.map(relation => relation.postId);

  // Fetch the posts that have postIds in the extracted postIds array
  const posts = await prisma.form.findMany({
    where: {
      id: {
        in: postIds,
      },
    },
  });

  // Log the posts to see the output in the console
  console.log(posts);

  const userData = {
    userId: user.id,
    email: user.email,
    name: user.name
  };

  return {
    userData, posts // This will make the userData available in +page.svelte
  };
};
