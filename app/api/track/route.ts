// app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    if (!path) return NextResponse.json({ ok: false }, { status: 400 });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = days[new Date().getDay()];

    // 1. Increment aggregate platform views
    await redis.incr('analytics:total_views');

    // 2. Increment route ranking
    await redis.zincrby('analytics:top_pages', 1, path);

    // 3. Increment today's view bucket
    await redis.incr(`analytics:daily:${currentDay}`);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}