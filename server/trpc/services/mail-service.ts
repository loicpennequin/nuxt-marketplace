import { Account, User } from '@prisma/client';
import nodemailer from 'nodemailer';

export type SendMailOptions = {
  account: Account & { user: User };
  body: string;
  subject: string;
};

export const sendMail = async ({ account, body, subject }: SendMailOptions) => {
  // const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false,
    // auth: {
    //   user: testAccount.user,
    //   pass: testAccount.pass
    // }
    host: 'localhost',
    port: 1025,
    secure: false,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: '"Website\'s Name" <hello@website.com>',
    to: account.email,
    subject,
    html: body
  });
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
