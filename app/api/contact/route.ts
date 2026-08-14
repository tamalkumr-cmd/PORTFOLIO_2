// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    if (!receiverEmail) {
      return NextResponse.json(
        { error: 'Receiver email is not configured on the server.' },
        { status: 500 }
      );
    }

    // Send email to your personal inbox
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Default free testing sender
      to: receiverEmail,
      replyTo: email, // Lets you click "Reply" directly to the sender!
      subject: `⚡ New Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e4e4e7;">
          <h2 style="color: #09090b; margin-top: 0;">📬 New Portfolio Message</h2>
          <p style="font-size: 14px; color: #52525b; margin-bottom: 20px;">You received an inquiry from your contact form on <strong>tamal.online</strong>.</p>
          
          <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 0; font-size: 14px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #059669;">${email}</a></p>
          </div>

          <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #71717a; font-weight: bold; letter-spacing: 0.5px;">Message Content:</p>
            <p style="margin: 0; font-size: 14px; color: #18181b; white-space: pre-wrap; line-height: 1.5;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0 16px 0;" />
          <p style="font-size: 12px; color: #a1a1aa; margin: 0; text-align: center;">You can reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact email error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to dispatch email.' },
      { status: 500 }
    );
  }
}