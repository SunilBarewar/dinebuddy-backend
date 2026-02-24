import morgan from "morgan";

import env from "@/config/env";
import logger from "@/lib/logger";

/**
 * Pipes Morgan HTTP request logs through Winston so every request line is
 * captured by all active transports (console + HyperDX).
 *
 * Format:
 *  - "dev"      – coloured, concise format in development for quick readability
 *  - "combined" – Apache-style structured format in production for log aggregators
 */
const requestLoggerMiddleware = morgan(
  env.NODE_ENV === "production" ? "combined" : "dev",
  {
    // Route Morgan output through Winston instead of stdout
    stream: {
      write: (message: string) =>
        logger.http(message.trimEnd(), { context: "HTTP" }),
    },

    // Skip health-check probes to keep logs clean in production.
    skip(req) {
      return (req.url ?? "").startsWith("/health");
    },
  },
);

export { requestLoggerMiddleware };
