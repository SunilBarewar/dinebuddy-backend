import morgan from "morgan";

import env from "@/config/env";

/**
 * Uses "dev" (coloured, concise) format in development for quick readability,
 * and "combined" (Apache-style, structured) in production for log aggregators
 * like Datadog, New Relic, or AWS CloudWatch.
 */
const requestLoggerMiddleware = morgan(
  env.NODE_ENV === "production" ? "combined" : "dev",
  {
    // Skip health-check probes to keep logs clean in production.
    // Morgan's skip callback receives http.IncomingMessage (not Express Request),
    // so we access the url property and check for the health path.
    skip(req) {
      return (req.url ?? "").startsWith("/health");
    },
  },
);

export { requestLoggerMiddleware };
