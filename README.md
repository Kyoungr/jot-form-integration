## Next.js JotForm Integration API
This repository contains a lightweight Next.js API that integrates JotForm with email and SMS services. The integration includes a webhook from the JotForm platform, Nodemailer for email automation, and Twilio for SMS notifications.

## Features
JotForm Webhook: Automatically triggers the workflow when a user submits a form.
Nodemailer Integration: Sends a follow-up email to the user upon form submission.
Twilio SMS Notification: Delivers an SMS notification to the user’s phone number.
Getting Started
Prerequisites
Make sure you have the following tools installed:

Node.js (v14 or above)
Next.js
Nodemailer
Twilio
JotForm Account
Installation
Clone the repository:

bash

Copy code

git clone https://github.com/your-username/nextjs-jotform-integration.git

cd nextjs-jotform-integration

Install dependencies:

bash
Copy code

npm install

Create a .env.local file in the root directory and add the following environment variables:

env
Copy code
# JotForm
JOTFORM_API_KEY=your_jotform_api_key

# Nodemailer (Example for Gmail, adapt based on your provider)
EMAIL_HOST=smtp.gmail.com 

EMAIL_PORT=465

EMAIL_USER=your_email@example.com

EMAIL_PASS=your_email_password

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid

TWILIO_AUTH_TOKEN=your_twilio_auth_token

TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Run the development server:

bash

Copy code

npm run dev

Visit http://localhost:3000 to view your API.

## JotForm Webhook Setup
In your JotForm account, navigate to the Settings of the form you want to integrate.
Under the Integrations section, 
add a Webhook URL. 
The URL should be your API endpoint,
e.g., https://yourdomain.com/api/jotform.

Nodemailer Configuration
Nodemailer is configured to send an email to the user after a form submission. 
Make sure to replace the email provider details in the .env.local file with your own. 
This example uses Gmail, but you can configure it with any SMTP provider.

Twilio SMS Notification
Twilio is used to send SMS notifications to the user’s phone number provided in the form. 
Ensure that your Twilio account is set up and your .env.local file has the correct credentials.

Usage
Once everything is set up:

A user submits a form via JotForm.
The JotForm webhook triggers your Next.js API.
The API sends a confirmation email to the user using Nodemailer.
The API sends an SMS to the user using Twilio.

Example Workflow
User submits the form on JotForm.
JotForm webhook triggers an API call to /api/jotform.
The API processes the submission, retrieves the user’s email and phone number, and sends both an email and an SMS notification.
Project Structure
/pages/api/jotform.js: Main API endpoint handling the webhook, email, and SMS logic.
/lib/nodemailer.js: Nodemailer configuration and email-sending functionality.
/lib/twilio.js: Twilio configuration and SMS-sending functionality.

Dependencies
Next.js - React framework for building server-side rendered applications.
Nodemailer - Email sending library.
Twilio - SMS sending platform.
JotForm API - API to integrate form submission data.
## License
This project is licensed under the MIT License. See the LICENSE file for details.
