// app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const secretPassword = process.env.ADMIN_SECRET_PASSWORD;

  if (!secretPassword || password !== secretPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('admin_session', secretPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return NextResponse.json({ success: true });
}