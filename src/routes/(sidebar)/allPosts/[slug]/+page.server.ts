import { redirect, fail } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const load: PageServerLoad = async () => {
  // todo
}

const submitComment: Action = async ({ cookies, request, params }) => {
  const data = await request.formData();
  const comment = data.get('comment');
  const slug = params.slug;

  // Assuming slug is defined elsewhere
  const post = await prisma.form.findUnique({
    where: { slug: `${slug}` }
  });

  console.log(`${comment}`);
  console.log(`${post.id}`);
  const session = cookies.get('session');
  if (!session) {
    return fail(401, { error: 'Unauthorized' });
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session }
  });
  console.log(`${user.id}`);
  if (!user || user.verifiedemail !== 1) {
    return fail(403, { error: 'User not authorized or verified' });
  }

  try {
    await prisma.comment.create({
      data: {
        postid: post.id,
        username: user.name,
        userid: user.id,
        comment: comment,
      },
    });
  } catch (error) {
    console.error("Failed to create form:", error);
    return fail(500, { error: 'Database operation failed' });
  }

  // Assuming redirect is properly implemented
  redirect(303, `/allPosts/${slug}`);
}


export const actions: Actions = {
  submitComment,
  delete: async ({ cookies, request }) => {
    const formData = await request.formData();
    const message = formData.get('message');
    const session = cookies.get('session');
    let post;
    let relation;
    if (session) {
      try {
        post = await prisma.form.findUnique({
          where: { slug: `${message}` }
        })
      } catch (e) {
        console.log(e);
      }
      const postid = post?.id;
      try {
        relation = await prisma.relation.findUnique({
          where: { postId: `${postid}` }
        })
      } catch (e) {
        console.log(e);
      }
      if (relation?.userId == session) {
        try {
          await prisma.form.delete({
            where: { slug: `${message}` }
          })
        } catch (e) {
          console.log(e);
        }

        redirect(303, '/allPosts');
      } else {
        console.log("error");

        //redirect(303, '/allPosts');
      }

    }
  },
}
