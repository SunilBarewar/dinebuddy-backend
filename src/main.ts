/**
 * HyperDX MUST be initialised before any other imports so its OpenTelemetry
 * instrumentation patches can intercept library calls (http, pg, winston …).
 */
import * as HyperDX from "@hyperdx/node-opentelemetry";

import env from "@/config/env";

if (env.HYPERDX_API_KEY) {
  HyperDX.init({
    apiKey: env.HYPERDX_API_KEY,
    service: "restaurant-management-backend",
  });
}

import { createApp } from "@/app";
import prisma from "@/lib/prisma-client";
import logger from "@/lib/logger";

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function bootstrap() {
  // DB connection check
  await prisma.$connect();
  logger.info("Database connection established ✓");

  const app = createApp();

  // Capture Express errors in HyperDX (register after all routes)
  if (env.HYPERDX_API_KEY) {
    HyperDX.setupExpressErrorHandler(app);
  }

  const server = app.listen(env.PORT, env.HOST, () => {
    console.log("────────────────────────────────────────");
    console.log(`  Restaurant Management API`);
    console.log(`  Environment : ${env.NODE_ENV}`);
    console.log(`  Host        : http://${env.HOST}:${env.PORT}`);
    console.log(`  Health      : http://localhost:${env.PORT}/health`);
    console.log("────────────────────────────────────────");
  });

  /**
   * Allows in-flight requests to complete before the process exits.
   * Essential for zero-downtime deploys with orchestrators like Kubernetes.
   */
  function gracefulShutdown(signal: string): void {
    logger.warn(`[${signal}] Shutdown signal received – closing HTTP server…`);

    server.close(async (err) => {
      await prisma.$disconnect();

      if (err) {
        logger.error("Error during server close", { error: err });
        process.exit(1);
      }

      logger.info("HTTP server closed. Goodbye 👋");
      process.exit(0);
    });

    // Force-exit if graceful shutdown takes longer than 30 seconds.
    setTimeout(() => {
      logger.error("Graceful shutdown timed out – forcing exit.");
      process.exit(1);
    }, 30_000).unref();
  }

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Docker / Kubernetes stop
  process.on("SIGINT", () => gracefulShutdown("SIGINT")); // Ctrl-C in dev

  /**
   * Log and exit on truly unexpected failures so a process manager can restart.
   */
  process.on("uncaughtException", (err: Error) => {
    logger.error("[uncaughtException] Unhandled exception", { error: err });
    process.exit(1);
  });

  process.on("unhandledRejection", (reason: unknown) => {
    logger.error("[unhandledRejection] Unhandled promise rejection", {
      reason,
    });
    process.exit(1);
  });
}

bootstrap().catch((error: unknown) => {
  logger.error("Failed to start server", { error });
  process.exit(1);
});
