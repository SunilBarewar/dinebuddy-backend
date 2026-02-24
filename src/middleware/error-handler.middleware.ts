import type { NextFunction, Request, Response } from "express";

import env from "@/config/env";
import { HttpError } from "@/exceptions/http-error";
import logger from "@/lib/logger";
import { sendErrorResponse } from "@/utils/response-formatter";

const isDev = env.NODE_ENV !== "production";

/**
 * 404 Not Found
 * Mounted AFTER all routes. Any request that reaches here matched nothing.
 */
export function notFoundHandler(req: Request, res: Response): void {
  sendErrorResponse(res, 404, {
    message: `Cannot ${req.method} ${req.path}`,
  });
}

/**
 * Global Error Handler
 * Must be the last middleware registered.
 * Express identifies it by the 4-parameter signature (err, req, res, next).
 * All errors thrown or passed to next(err) anywhere in the app land here.
 */
export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  /**
   * Operational errors (expected, thrown intentionally)
   */
  if (err instanceof HttpError) {
    sendErrorResponse(res, err.statusCode, {
      message: err.message,
      ...(isDev && { stack: err.stack }),
    });

    return;
  }

  /**
   * Unclassified / programming errors
   * Never leak error details or stack traces to the client in production.
   */

  logger.error("[GlobalErrorHandler] Unexpected error", { error: err });

  sendErrorResponse(res, 500, {
    message: "An unexpected error occurred. Please try again later.",
    ...(isDev && { error: err.message, stack: err.stack }),
  });
}
