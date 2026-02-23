import type { TEnv } from "@/config/env";

// ─── ProcessEnv Augmentation ──────────────────────────────────────────────────
// Derives the ProcessEnv shape directly from the Zod-validated TEnv type so
// there is a single source of truth: src/config/env.ts.
//
// NOTE: process.env values are always strings before Zod parses them, so
// numeric/boolean fields are typed as `string` here (the raw form).
// After parsing via env.ts they become the correct coerced types.

declare global {
  namespace NodeJS {
    // Map every key in TEnv to string | undefined (the raw process.env shape).
    // Zod handles the coercion; this gives IDE autocompletion on process.env.
    type ProcessEnv = {
      [K in keyof TEnv]?: string;
    } & {
      // Keep the standard Node.js env vars available.
      PATH?: string;
      HOME?: string;
      [key: string]: string | undefined;
    };
  }
}

export {};
