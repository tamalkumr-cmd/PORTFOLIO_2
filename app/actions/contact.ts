// app/actions/contact.ts
'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'Please fill out all fields.' };
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'your-email@gmail.com',
      subject: `⚡ New Portfolio Message from ${name}`,
      text: `Sender: ${name} (${email})\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (err) {
    return { error: 'Failed to send message. Please reach out directly via email.' };
  }
}