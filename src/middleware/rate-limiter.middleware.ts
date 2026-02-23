import rateLimit from "express-rate-limit";

import { HttpError } from "@/exceptions/http-error";

/**
 * General rate limiter
 */
const rateLimitHandler = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // max requests per window per IP
  standardHeaders: "draft-7", // Return RateLimit-* headers (RFC draft-7)
  legacyHeaders: false, // Disable the old X-RateLimit-* headers
  handler(_req, _res, next) {
    next(
      new HttpError(
        429,
        "Too many requests, please slow down and try again later.",
      ),
    );
  },
});

/**
 * Stricter limiter for sensitive auth endpoints
 * Login / register / password-reset are the main brute-force targets.
 */
const authRateLimitHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // only 20 attempts per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler(_req, _res, next) {
    next(
      new HttpError(
        429,
        "Too many authentication attempts. Please wait 15 minutes before trying again.",
      ),
    );
  },
});

export { authRateLimitHandler, rateLimitHandler };
