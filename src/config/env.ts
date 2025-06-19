import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // Server configuration
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  // Database configuration
  DATABASE_HOST: z.string().min(1, "Database host is required"),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().min(1, "Database user is required"),
  DATABASE_PASSWORD: z.string().min(1, "Database password is required"),
  DATABASE_NAME: z.string().min(1, "Database name is required"),
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  // Jwt configuration
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
