// lib/redis.ts
import { Redis } from '@upstash/redis';

function getSanitizedRedisUrl(): string {
  let rawUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();

  if (!rawUrl || rawUrl.includes('placeholder')) {
    return 'https://placeholder.upstash.io';
  }

  // If redis:// or rediss:// protocol was mistakenly passed, convert to https://
  if (rawUrl.startsWith('redis://')) {
    rawUrl = rawUrl.replace('redis://', 'https://');
  } else if (rawUrl.startsWith('rediss://')) {
    rawUrl = rawUrl.replace('rediss://', 'https://');
  } else if (!rawUrl.startsWith('https://') && !rawUrl.startsWith('http://')) {
    rawUrl = `https://${rawUrl}`;
  }

  return rawUrl;
}

const url = getSanitizedRedisUrl();
const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || 'placeholder_token';

export const redis = new Redis({
  url,
  token,
});