import { NextResponse } from 'next/server';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Parse the form data from the request body
    const formData = await request.json();
    
    // Extract relevant fields from the form
    const { email: userEmail, phone: userPhone, name: userName } = formData;

    // Ensure essential data is available
    if (!userEmail || !userPhone || !userName) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    // Initialize Twilio client
    const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    // Setup Nodemailer for sending follow-up emails
    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASS,
      },
    });

    // Prepare the email options
    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: userEmail,
      subject: `Thank you for your submission, ${userName}`,
      text: `Hi ${userName}, thank you for submitting your form. We will contact you soon.`,
    };

    // Send follow-up email
    await transporter.sendMail(mailOptions);

    // Send follow-up SMS using Twilio
    await twilioClient.messages.create({
      body: `Hi ${userName}, thank you for submitting the form! We'll reach out to you soon.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: userPhone,
    });

    // Respond with success message
    return NextResponse.json({ message: 'Email and SMS sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
