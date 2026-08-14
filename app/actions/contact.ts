// app/actions/contact.ts
'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    const receiverEmail = process.env.CONTACT_EMAIL || 'tamalkumr@gmail.com';

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: receiverEmail,
      replyTo: email,
      subject: `⚡ New Message from ${name} via Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #09090b; color: #f4f4f5; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #10b981; margin-top: 0;">⚡ New Portfolio Message</h2>
          <div style="background-color: #18181b; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #27272a;">
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #34d399;">${email}</a></p>
          </div>
          <div style="background-color: #18181b; padding: 16px; border-radius: 8px; border: 1px solid #27272a;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #a1a1aa; font-weight: bold;">Message:</p>
            <p style="margin: 0; font-size: 14px; color: #f4f4f5; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #71717a; margin-top: 20px; text-align: center;">Hit "Reply" in your email client to respond directly to ${name}.</p>
        </div>
      `,
    });

    if (data.error) {
      console.error('[Resend Error Details]:', data.error);
      return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('[Server Action Error]:', error);
    return { success: false, error: error?.message || 'Internal server error while sending email.' };
  }
}