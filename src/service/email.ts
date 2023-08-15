import nodemailer from 'nodemailer';

export type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_AUTH_USER,
    pass: process.env.NEXT_PUBLIC_AUTH_PASS,
  },
});

export async function sendEmail({ subject, from, message }: EmailData) {
  const mailData = {
    to: process.env.NEXT_PUBLIC_AUTH_USER,
    subject: `[MokuMoku] ${subject}`,
    from,
    html: `
        <p>보낸사람: ${from}</p>
      <h2>${subject}</h2>
      <div>${message}</div>
      <br/>
      `,
  };

  return transporter.sendMail(mailData);
}
