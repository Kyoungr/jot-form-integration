import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/app/lib/email';
import { sendSMS } from '@/app/lib/sms';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  name: z.string().min(1),
});

export async function POST(request: NextRequest) {
  console.log('Webhook received from Jotform');

  try {
    // Parse the form data from the request body
    const formData = await parseFormData(request);
    console.log('formData: ', formData);

    // const validatedData = formSchema.parse({
    //   email: formData.get('email'),
    //   phone: formData.get('phone'),
    //   name: formData.get('name'),
    // });

    // await Promise.all([sendEmail(validatedData), sendSMS(validatedData)]);

    return NextResponse.json(
      { message: 'Email and SMS sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function parseFormData(request: NextRequest): Promise<FormData> {
  const contentType = request.headers.get('content-type');
  if (
    contentType &&
    contentType.includes('application/x-www-form-urlencoded')
  ) {
    const text = await request.text();
    const params = new URLSearchParams(text);
    const formData = new FormData();
    Array.from(params).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  } else {
    return request.formData();
  }
}
