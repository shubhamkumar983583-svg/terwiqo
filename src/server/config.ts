import { z } from 'zod';
import dotenv from 'dotenv';

// Load local .env if present
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default('3000'),
  DATABASE_URL: z.string().optional(),
  PG_CONNECTION_STRING: z.string().optional(),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET should be at least 16 characters').default('workpulse-enterprise-secret-key-2026-cloud'),
  COOKIE_SECRET: z.string().default('workpulse-cookie-secret-key-2026'),
  SESSION_EXPIRY_DAYS: z.number().default(30),
  GEMINI_API_KEY: z.string().optional(),
  APP_URL: z.string().optional()
});

export type ServerConfig = z.infer<typeof envSchema>;

let parsedConfig: ServerConfig;

try {
  parsedConfig = envSchema.parse(process.env);
} catch (err: any) {
  console.warn('[Config] Env validation notice:', err?.errors || err?.message);
  parsedConfig = {
    NODE_ENV: 'development',
    PORT: 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET || 'workpulse-enterprise-secret-key-2026-cloud',
    COOKIE_SECRET: 'workpulse-cookie-secret-key-2026',
    SESSION_EXPIRY_DAYS: 30,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    APP_URL: process.env.APP_URL
  };
}

export const serverConfig = parsedConfig;
