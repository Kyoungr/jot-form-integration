import { NextRequest, NextResponse } from 'next/server';
// import { sendEmail } from '@/app/lib/email';
// import { sendSMS } from '@/app/lib/sms';
import { z } from 'zod';

// const formSchema = z.object({
//   email: z.string().email(),
//   phone: z.string().min(10),
//   firstName: z.string().min(1),
//   lastName: z.string().min(1),
// });

// Add this new function to handle GET requests
// export async function GET() {
//   return NextResponse.json(
//     { message: 'Webhook endpoint is active' },
//     { status: 200 }
//   );
// }

// Add this configuration to allow external POST requests
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  console.log('Webhook received from Jotform');
  console.log('RawData: ', request);

  // Check if the request is coming from Jotform
  const origin = request.headers.get('origin');
  if (origin !== 'https://submit.jotform.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    // Parse the form data from the request body
    const formData = await parseRequestData(request);
    console.log('formData: ', formData);

    // const validatedData = formSchema.parse({
    //   email: formData.email,
    //   phone: formData['phonenumber[full]'],
    //   firstName: formData['name[first]'],
    //   lastName: formData['name[last]'],
    // });

    // console.log('Validated data:', validatedData);

    const emailData = {
      email: formData.email,
      name: `${formData['name[first]']} ${formData['name[last]']}`,
    };

    const smsData = {
      phone: formData['phonenumber[full]'],
      name: `${formData['name[first]']} ${formData['name[last]']}`,
    };

    console.log('emailData: ', emailData);
    console.log('smsData: ', smsData);

    // await Promise.all([sendEmail(emailData), sendSMS(smsData)]);

    return NextResponse.json(
      { message: 'Webhook received and processed successfully!' },
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

async function parseRequestData(request: NextRequest) {
  const contentType = request.headers.get('content-type');
  console.log('Content-Type:', contentType);

  if (contentType?.includes('application/json')) {
    return request.json();
  } else if (contentType?.includes('application/x-www-form-urlencoded')) {
    const text = await request.text();
    const params = new URLSearchParams(text);
    return Object.fromEntries(params);
  } else if (contentType?.includes('multipart/form-data')) {
    const formData = await request.formData();
    return Object.fromEntries(formData);
  } else {
    // If content type is not recognized, try to parse as text
    const text = await request.text();
    console.log('Raw request body:', text);
    try {
      return JSON.parse(text);
    } catch {
      return { rawData: text };
    }
  }
}
