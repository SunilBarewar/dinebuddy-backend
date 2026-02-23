import { z } from "zod";

const EnvSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(8000),
  HOST: z.string().default("0.0.0.0"),

  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // CORS

  ALLOWED_ORIGINS: z.string().optional(),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `  • ${issue.path.join(".")} — ${issue.message}`)
    .join("\n");

  // eslint-disable-next-line no-console
  console.error(
    `\n❌ Invalid environment variables:\n${formatted}\n\nFix the above variables in your .env file and restart.\n`,
  );

  process.exit(1);
}

const env = parsed.data;

export default env;

export type TEnv = z.infer<typeof EnvSchema>;
