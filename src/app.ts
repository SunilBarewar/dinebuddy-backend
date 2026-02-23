import express, { type Request, type Response } from "express";
import helmet from "helmet";

import env from "@/config/env";

import { compressionMiddleware } from "@/middleware/compression.middleware";
import { corsMiddleware } from "@/middleware/cors.middleware";
import {
  globalErrorHandler,
  notFoundHandler,
} from "@/middleware/error-handler.middleware";
import { rateLimitHandler } from "@/middleware/rate-limiter.middleware";
import { requestLoggerMiddleware } from "@/middleware/request-logger.middleware";
import apiRouter from "@/routes";

export function createApp(): express.Application {
  const app = express();

  // Required behind NGINX / ALB / Cloudflare so req.ip, req.protocol, and
  // secure cookies are resolved correctly.
  app.set("trust proxy", 1);

  // Sets Content-Security-Policy, X-Frame-Options, X-Content-Type-Options,
  // Strict-Transport-Security, and many more via Helmet.
  app.use(helmet());

  app.use(corsMiddleware);

  app.use(compressionMiddleware);

  app.use(requestLoggerMiddleware);

  app.use(rateLimitHandler);

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  /**
   * Health Check
   * Placed before the API routes so load-balancers get a fast response even
   * when application routes are slow or middleware is pending.
   */
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  });

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Restaurant Management Backend API",
      status: "success",
      version: "v1",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api/v1", apiRouter);

  app.use(notFoundHandler);

  /**
   * Global Error Handler
   * Must be the last middleware registered. Express identifies it by the
   * 4-parameter signature (err, req, res, next).
   */
  app.use(globalErrorHandler);

  return app;
}
