import { fail, redirect} from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
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

const generateUniqueCode = async () => {
  // Generate a unique code based on current date and time
  const currentDate = new Date();
  const uniqueCode = currentDate.getTime().toString(); // Convert timestamp to string
  return uniqueCode;
};

const submitform: Action = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const password = data.get('password');

  if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string') {
    return fail(400, { error: 'Invalid form data' });
  }

  console.log(`${name}`);
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
  });

  if (existingUser) {
    console.log("User already exists");
    return fail(400, { error: 'User already exists' });
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  try {
    // Generate unique code
    const uniqueCode = await generateUniqueCode();

    // Create user with unique code
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
        codpentruverificare: uniqueCode,
        verifiedemail: 0 // Store the unique code in the database
      },
    });
    const mailOptions = {
      from: `7557dc001@smtp-brevo.com`, // sender address
      to: `${email}`, // list of receivers
      subject: `Contul tau Adnex, ${name} `, // Subject line
      text: ``, // plain text body
      html: `<!--
      * This email was built using Tabular.
      * For more information, visit https://tabular.email
      -->
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
      <title></title>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <!--[if !mso]>-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <meta name="x-apple-disable-message-reformatting" content="" />
      <meta content="target-densitydpi=device-dpi" name="viewport" />
      <meta content="true" name="HandheldFriendly" />
      <meta content="width=device-width" name="viewport" />
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
      <style type="text/css">
      table {
      border-collapse: separate;
      table-layout: fixed;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt
      }
      table td {
      border-collapse: collapse
      }
      .ExternalClass {
      width: 100%
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
      line-height: 100%
      }
      body, a, li, p, h1, h2, h3 {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      }
      html {
      -webkit-text-size-adjust: none !important
      }
      body, #innerTable {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale
      }
      #innerTable img+div {
      display: none;
      display: none !important
      }
      img {
      Margin: 0;
      padding: 0;
      -ms-interpolation-mode: bicubic
      }
      h1, h2, h3, p, a {
      line-height: inherit;
      overflow-wrap: normal;
      white-space: normal;
      word-break: break-word
      }
      a {
      text-decoration: none
      }
      h1, h2, h3, p {
      min-width: 100%!important;
      width: 100%!important;
      max-width: 100%!important;
      display: inline-block!important;
      border: 0;
      padding: 0;
      margin: 0
      }
      a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important
      }
      u + #body a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
      }
      a[href^="mailto"],
      a[href^="tel"],
      a[href^="sms"] {
      color: inherit;
      text-decoration: none
      }
      img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:27px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#bdbdbd;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:33px;font-weight:700;font-style:normal;font-size:25px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#dcff93;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#ddff94;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#ddff94;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
      </style>
      <style type="text/css">
      @media (min-width: 481px) {
      .hd { display: none!important }
      }
      </style>
      <style type="text/css">
      @media (max-width: 480px) {
      .hm { display: none!important }
      }
      </style>
      <style type="text/css">
      @media (min-width: 481px) {
      h1,h2,img,p{font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif}h2,h3{color:#ddff94;mso-text-raise:2px}.t32,.t38,.t7{width:580px!important}.t12,.t16,.t20,.t24,.t40{mso-text-raise:3px!important}img,p{margin:0;Margin:0;line-height:27px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#bdbdbd;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1,h2,h3{margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;text-align:left;mso-line-height-rule:exactly}h1{line-height:52px;font-size:48px;color:#dcff93;mso-text-raise:1px}h2{line-height:30px;font-size:24px}h3{font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-size:20px}.t38{padding-top:50px!important;padding-bottom:50px!important}.t3{padding:30px 50px!important}.t28{padding:50px!important}.t1,.t10,.t14,.t18,.t22,.t26{width:480px!important}.t49{mso-line-height-alt:50px!important;line-height:50px!important}.t47{width:600px!important}.t41{width:420px!important}.t40{line-height:23px!important}.t13,.t17,.t21,.t25{mso-line-height-alt:17px!important;line-height:17px!important}.t12,.t16,.t20,.t24{line-height:27px!important;font-size:18px!important}
      }
      </style>
      <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:27px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#bdbdbd;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}.moz-text-html h1{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:52px;font-weight:700;font-style:normal;font-size:48px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#dcff93;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px}.moz-text-html h2{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#ddff94;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#ddff94;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t38{padding-top:50px!important;padding-bottom:50px!important;width:580px!important}.moz-text-html .t7{width:580px!important}.moz-text-html .t3{padding:30px 50px!important}.moz-text-html .t32{width:580px!important}.moz-text-html .t28{padding:50px!important}.moz-text-html .t10{width:480px!important}.moz-text-html .t49{mso-line-height-alt:50px!important;line-height:50px!important}.moz-text-html .t47{width:600px!important}.moz-text-html .t41{width:420px!important}.moz-text-html .t40{line-height:23px!important;mso-text-raise:3px!important}.moz-text-html .t13{mso-line-height-alt:17px!important;line-height:17px!important}.moz-text-html .t14{width:480px!important}.moz-text-html .t12{line-height:27px!important;font-size:18px!important;mso-text-raise:3px!important}.moz-text-html .t25{mso-line-height-alt:17px!important;line-height:17px!important}.moz-text-html .t26{width:480px!important}.moz-text-html .t24{line-height:27px!important;font-size:18px!important;mso-text-raise:3px!important}.moz-text-html .t1{width:480px!important}.moz-text-html .t17{mso-line-height-alt:17px!important;line-height:17px!important}.moz-text-html .t18{width:480px!important}.moz-text-html .t16{line-height:27px!important;font-size:18px!important;mso-text-raise:3px!important}.moz-text-html .t21{mso-line-height-alt:17px!important;line-height:17px!important}.moz-text-html .t22{width:480px!important}.moz-text-html .t20{line-height:27px!important;font-size:18px!important;mso-text-raise:3px!important}</style>
      <!--[if !mso]>-->
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&amp;family=Fira+Sans:wght@400&amp;family=Inter:wght@400&amp;display=swap" rel="stylesheet" type="text/css" />
      <!--<![endif]-->
      <!--[if mso]>
      <style type="text/css">
      img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:27px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#bdbdbd;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:52px;font-weight:700;font-style:normal;font-size:48px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#dcff93;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#ddff94;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#ddff94;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}td.t38{padding-top:50px !important;padding-bottom:50px !important}td.t3{padding:30px 50px !important}td.t28{padding:50px !important}div.t49{mso-line-height-alt:50px !important;line-height:50px !important}p.t40{line-height:23px !important;mso-text-raise:3px !important}div.t13{mso-line-height-alt:17px !important;line-height:17px !important}p.t12{line-height:27px !important;font-size:18px !important;mso-text-raise:3px !important}div.t25{mso-line-height-alt:17px !important;line-height:17px !important}p.t24{line-height:27px !important;font-size:18px !important;mso-text-raise:3px !important}div.t17{mso-line-height-alt:17px !important;line-height:17px !important}p.t16{line-height:27px !important;font-size:18px !important;mso-text-raise:3px !important}div.t21{mso-line-height-alt:17px !important;line-height:17px !important}p.t20{line-height:27px !important;font-size:18px !important;mso-text-raise:3px !important}
      </style>
      <![endif]-->
      <!--[if mso]>
      <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      </head>
      <body id="body" class="t52" style="min-width:100%;Margin:0px;padding:0px;background-color:#EDEDED;"><div class="t51" style="background-color:#EDEDED;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t50" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#EDEDED;" valign="top" align="center">
      <!--[if mso]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
      <v:fill color="#EDEDED"/>
      </v:background>
      <![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td>
      <!--[if mso]>
      <table class="t39" role="presentation" cellpadding="0" cellspacing="0" align="center">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t39" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t38" style="width:600px;padding:20px 10px 20px 10px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t38" style="width:460px;padding:20px 10px 20px 10px;">
      <!--<![endif]-->
      <div class="t37" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="580"><tr><td width="580" valign="top"><![endif]-->
      <div class="t36" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:600px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t35"><tr>
      <td class="t34"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <!--[if mso]>
      <table class="t8" role="presentation" cellpadding="0" cellspacing="0" align="center">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t8" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t7" style="width:580px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t7" style="width:460px;">
      <!--<![endif]-->
      <div class="t6" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="580"><tr><td width="580" valign="top"><![endif]-->
      <div class="t5" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:600px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t4"><tr>
      <td class="t3" style="border-bottom:1px solid #454545;overflow:hidden;background-color:#9E24BF;padding:20px 30px 20px 30px;border-radius:8px 8px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <!--[if mso]>
      <table class="t2" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t2" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t1" style="width:480px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t1" style="width:400px;">
      <!--<![endif]-->
      <h3 class="t0" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Adnex</h3></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </div>
      <!--[if mso]>
      </td>
      </tr></table>
      <![endif]-->
      </div></td>
      </tr></table>
      </td></tr><tr><td>
      <!--[if mso]>
      <table class="t33" role="presentation" cellpadding="0" cellspacing="0" align="center">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t33" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t32" style="width:580px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t32" style="width:460px;">
      <!--<![endif]-->
      <div class="t31" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="580"><tr><td width="580" valign="top"><![endif]-->
      <div class="t30" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:600px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t29"><tr>
      <td class="t28" style="border-bottom:1px solid #F7F7F7;overflow:hidden;background-color:#FFFFFF;padding:30px 30px 30px 30px;border-radius:0 0 8px 8px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <!--[if mso]>
      <table class="t11" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t11" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t10" style="width:480px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t10" style="width:400px;">
      <!--<![endif]-->
      <h3 class="t9" style="margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;direction:ltr;color:#BF2A9C;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Iți mulțumim pentru înregistrare, ${name}!</h3></td>
      </tr></table>
      </td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
      <!--[if mso]>
      <table class="t15" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t15" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t14" style="width:480px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t14" style="width:400px;">
      <!--<![endif]-->
      <p class="t12" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:23px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#545454;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Folosește codul: ${uniqueCode} pentru verificarea acestui email.</p></td>
      </tr></table>
      </td></tr><tr><td><div class="t17" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
      <!--[if mso]>
      <table class="t19" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t19" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t18" style="width:480px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t18" style="width:400px;">
      <!--<![endif]-->
      <p class="t16" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:23px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#545454;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Te rugăm să îți verifici adresa de email la <a href="localhost:5173/authentication/verificare">ACEASTĂ</a> adresă. <a href="localhost:5173/authentication/verificare">CLICK AICI</a></p></td>
      </tr></table>
      </td></tr><tr><td><div class="t21" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
      <!--[if mso]>
      <table class="t23" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t23" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t22" style="width:480px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t22" style="width:400px;">
      <!--<![endif]-->
      <p class="t20" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:23px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#545454;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">De asemenea, dacă iți uiti parola, te rog accesează secțiunea Am uitat parola, valabila pe pagina de logare.</p></td>
      </tr></table>
      </td></tr><tr><td><div class="t25" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td>
      <!--[if mso]>
      <table class="t27" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t27" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t26" style="width:480px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t26" style="width:400px;">
      <!--<![endif]-->
      <p class="t24" style="margin:0;Margin:0;font-family:Inter,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:23px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#545454;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Dacă nu tu ai solicitat creearea unui cont pe website-ul nostru, ignoră acest mesaj.</p></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </div>
      <!--[if mso]>
      </td>
      </tr></table>
      <![endif]-->
      </div></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </div>
      <!--[if mso]>
      </td>
      </tr></table>
      <![endif]-->
      </div></td>
      </tr></table>
      </td></tr><tr><td>
      <!--[if mso]>
      <table class="t48" role="presentation" cellpadding="0" cellspacing="0" align="center">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t48" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t47" style="width:600px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t47" style="width:480px;">
      <!--<![endif]-->
      <div class="t46" style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top" width="600"><tr><td width="600" valign="top"><![endif]-->
      <div class="t45" style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:600px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t44"><tr>
      <td class="t43" style="padding:0 50px 0 50px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
      <!--[if mso]>
      <table class="t42" role="presentation" cellpadding="0" cellspacing="0" align="left">
      <![endif]-->
      <!--[if !mso]>-->
      <table class="t42" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;">
      <!--<![endif]-->
      <tr>
      <!--[if mso]>
      <td class="t41" style="width:420px;">
      <![endif]-->
      <!--[if !mso]>-->
      <td class="t41" style="width:380px;">
      <!--<![endif]-->
      <p class="t40" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#878787;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;"><br/></p></td>
      </tr></table>
      </td></tr></table></td>
      </tr></table>
      </div>
      <!--[if mso]>
      </td>
      </tr></table>
      <![endif]-->
      </div></td>
      </tr></table>
      </td></tr><tr><td><div class="t49" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div></body>
      </html>`
    }
    
    await transporter.sendMail(mailOptions);

    throw redirect(300, '/authentication/signin');

    
    return {
      status: 200,
      body: {
        message: 'Email sent successfully'
      }
    };
    

  } catch (error) {
    console.error("Failed to create user:", error);
    return fail(500, { error: 'Database operation failed' });
  }
  //throw redirect(302,'http://localhost:5173/authentication/login');
   };

export const actions: Actions = { submitform };
