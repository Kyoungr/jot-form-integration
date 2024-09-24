import nodemailer from 'nodemailer';

interface EmailData {
  email: string;
  name: string;
}

export async function sendEmail({ email, name }: EmailData) {
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
  });

  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: email,
    subject: `Thank you for your submission, ${name}`,
    text: `Hi ${name}, thank you for submitting your form. We will contact you soon.`,
  };

  await transporter.sendMail(mailOptions);
}
