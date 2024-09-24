import twilio from 'twilio';

interface SMSData {
  phone: string;
  name: string;
}

export async function sendSMS({ phone, name }: SMSData) {
  const twilioClient = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await twilioClient.messages.create({
    body: `Hi ${name}, thank you for submitting the form! We'll reach out to you soon.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
}
