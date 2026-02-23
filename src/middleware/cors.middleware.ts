import cors from "cors";

import env from "@/config/env";

/**
 * Reads from env so you never need to redeploy to whitelist a new origin.
 * Format: comma-separated list, e.g. "https://app.example.com,https://admin.example.com"
 */
function getAllowedOrigins(): string[] {
  const raw = env.ALLOWED_ORIGINS ?? "";

  if (!raw.trim()) {
    return env.NODE_ENV === "production"
      ? []
      : ["http://localhost:3000", "http://localhost:5173"];
  }

  return raw.split(",").map((o) => o.trim());
}

const corsMiddleware = cors({
  origin(requestOrigin, callback) {
    const allowed = getAllowedOrigins();

    // Server-to-server requests (e.g. Postman, curl) have no Origin header.
    if (!requestOrigin) {
      return callback(null, true);
    }

    if (allowed.includes(requestOrigin)) {
      return callback(null, true);
    }

    callback(new Error(`CORS: origin '${requestOrigin}' is not allowed`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
  exposedHeaders: ["RateLimit-Limit", "RateLimit-Remaining", "RateLimit-Reset"],
  credentials: true,
  maxAge: 86_400,
});

export { corsMiddleware };
