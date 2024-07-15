import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const load: PageServerLoad = async () => {
  // todo
}
  const submitform: Action = async ({ cookies,request }) => {
  const data = await request.formData()
  const nume = data.get('nume')
  //const email = data.get('email') 
  const titlu = data.get('titlu') 
  const prenume = data.get('prenume') 
  const organizatie = data.get('organizatie') 
  const oras = data.get('oras') 
  const adresa = data.get('adresa')  
  const mobil = data.get('nrmobil') 
  const suprafata = data.get('suprafata') 
  const camere = data.get('camere') 
  const mobilat = data.get('mobilat') 
  const descriere = data.get('descriere') 
  const slug = data.get('titlu') 
  const pret = data.get('pret')
  const images = data.getAll('images');

  console.log(`${titlu}`);
    const session = cookies.get('session');
    const user  = await prisma.user.findUnique({
      where: {id:session}
  });
  const email = user?.email;
  console.log(user.verifiedemail)

 if (user.verifiedemail == 1)
{
  try {
    await prisma.form.create({
      data: {
        titlu: `${titlu}`,
        email: `${email}`,
        nume: `${nume}`,
        prenume: `${prenume}`,
        organizatie: `${organizatie}`,
        oras: `${oras}`,
        adresa: `${adresa}`,
        mobil: `${mobil}`,
        suprafata: `${suprafata}`,
        camere: `${camere}`,
        mobilat: `${mobilat}`,
        descriere: `${descriere}`,
        slug: `${slug}`,
        pret: `${pret}`,
        images: [`${images}`]
      },
    });
  } catch (error) {
    console.error("Failed to create form:", error);
    return fail(500, { error: 'Database operation failed' });
  }
  const post  = await prisma.form.findUnique({
    where:{slug:`${slug}`}
  })
  try{
    await prisma.relation.create({
      data:{
        userId:`${session}`,
        postId:`${post?.id}`
      }
    })
  }catch(e)
  {
    console.log("failed to create relation",e);
    return fail(500,{e:'Database operation failed'});
  }
}

 
  redirect(303, '/allPosts')
}


export const actions: Actions = { submitform }
