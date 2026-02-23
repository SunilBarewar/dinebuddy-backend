import compression from "compression";
import type { Request, Response } from "express";

/**
 * Compresses responses with gzip/deflate.
 * Skips compression for small payloads (< 1KB) to avoid CPU overhead with
 * no real benefit, and for Server-Sent Events / streaming responses.
 */
const compressionMiddleware = compression({
  // Only compress responses larger than 1 KB
  threshold: 1024,

  filter(req: Request, res: Response): boolean {
    // Respect the caller's explicit opt-out
    if (req.headers["x-no-compression"]) {
      return false;
    }

    // Use the default compression filter for everything else
    return compression.filter(req, res);
  },
});

export { compressionMiddleware };
