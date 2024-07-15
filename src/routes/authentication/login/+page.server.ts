import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageServerLoad = async ({cookies}) => {
  // todo
  /*const session = cookies.get('session');
  const user = await prisma.user.findUnique({
    where:{id:session}
    
  });
  if(user)
    {

    }*/
};

const submitform: Action = async ({ cookies,request }) => {
  const data = await request.formData();
  //onst name = data.get('name');
  const email = data.get('email');
  const password = data.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return fail(400, { error: 'Invalid form data' });
  }

  //console.log(`${name}`);
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
  });

  if (existingUser) {
    const passwordValid = bcrypt.compareSync(password,existingUser.password);
    if(passwordValid)
    {
        //save user data using cookies
        
        
          cookies.set('session', existingUser.id, {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            //sameSite: 'strict',
            // only sent over HTTPS in production
            secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
          })
        
        throw redirect(303, '/allPosts');
    }
    else
    {
        console.log("Wrong Password");
        return fail(400, { error: 'User already exists' });
    }
  }
  else
  {
    console.log("User does not exist");
    return fail(400, { error: 'User already exists' });
  }

  /*const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    return fail(500, { error: 'Database operation failed' });
  }
  */
};

export const actions: Actions = { submitform };
