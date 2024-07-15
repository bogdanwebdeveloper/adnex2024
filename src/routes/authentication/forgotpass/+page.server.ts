import { fail} from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';


import nodemailer from 'nodemailer';
const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
  // todo
};

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '7557dc001@smtp-brevo.com',
    pass: 'n41P9DhMtQJmHpX6'
  }
});
// @ts-expect-ignore
const submitresetare: Action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email') as string;
  const codverificare = data.get('codverificare') as string;
  const parolanoua = data.get('nouaparola') as string;

  console.log(`${email}`);
  console.log(`${codverificare}`)
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
});
  console.log('INAINTE');
  console.log(existingUser.codpentruverificare);
  console.log('DUPA');
  console.log(existingUser.name);
  console.log(parolanoua);
  const saltRounds = 10;
  const hash = await bcrypt.hash(parolanoua, saltRounds);

    if (codverificare == existingUser.codpentruverificare) {
        try {
            const mailOptions = {
              from: `7557dc001@smtp-brevo.com`, // sender address
              to: `${email}`, // list of receivers
              subject: `Resetare parolă, ${existingUser.name} `, // Subject line
              text: ``, // plain text body
              html: ``
            }

            await transporter.sendMail(mailOptions);
            await prisma.user.update({
              where: { email: email },
              data: { password: hash}
          });
          } catch (error) {
            console.error("Failed", error);
            return fail(500, { error: 'failed' });
          }
    }
   };

export const actions: Actions = { submitresetare };
