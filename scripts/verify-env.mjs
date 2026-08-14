// scripts/verify-env.mjs
import { config } from 'dotenv';
config({ path: '.env.local' });

console.log('🚀 Running Environment & API Pre-Flight Checks...\n');

const requiredEnvs = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'RESEND_API_KEY',
  'CONTACT_EMAIL',
  'ADMIN_SECRET_PASSWORD',
];

let missing = 0;
for (const envKey of requiredEnvs) {
  if (!process.env[envKey] || process.env[envKey].includes('placeholder')) {
    console.error(`❌ Missing or placeholder: ${envKey}`);
    missing++;
  } else {
    console.log(`✅ Loaded: ${envKey}`);
  }
}

if (missing > 0) {
  console.error(`\n⚠️ ${missing} environment variable(s) require attention in .env.local\n`);
  process.exit(1);
} else {
  console.log('\n🎉 All environment keys are properly configured and ready for build!\n');
}