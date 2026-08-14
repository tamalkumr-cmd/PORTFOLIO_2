// lib/redis.ts
import { Redis } from '@upstash/redis';

// Use the safe fallback to prevent build crashes
const url = process.env.UPSTASH_REDIS_REST_URL?.trim() || 'https://placeholder.upstash.io';
const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || 'placeholder_token';

export const redis = new Redis({
  url,
  token,
});