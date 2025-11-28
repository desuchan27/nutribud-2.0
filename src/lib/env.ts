/**
 * Environment variable validation
 * Ensures all required environment variables are present at startup
 */

import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),

  // Node environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Add other required environment variables here as needed
  // Example:
  // UPLOADTHING_SECRET: z.string().min(1, "UPLOADTHING_SECRET is required"),
  // UPLOADTHING_APP_ID: z.string().min(1, "UPLOADTHING_APP_ID is required"),
});

type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * This will throw an error at startup if required variables are missing
 */
export const env: Env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n");
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars}\n\nPlease check your .env file.`
      );
    }
    throw error;
  }
})();

