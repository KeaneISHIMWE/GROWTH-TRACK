import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET ?? '',
};

if (!config.supabaseJwtSecret) {
  console.warn('SUPABASE_JWT_SECRET is not set. JWT verification will fail.');
}

