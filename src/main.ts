/* eslint-disable no-console */
import env from "@/config/env";
import { createApp } from "@/app";

const app = createApp();

const server = app.listen(env.PORT, env.HOST, () => {
  console.log("────────────────────────────────────────");
  console.log(`  🍽️  Restaurant Management API`);
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
  console.log(`\n[${signal}] Shutdown signal received – closing HTTP server…`);

  server.close((err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }

    console.log("HTTP server closed. Goodbye 👋");
    process.exit(0);
  });

  // Force-exit if graceful shutdown takes longer than 30 seconds.
  setTimeout(() => {
    console.error("Graceful shutdown timed out – forcing exit.");
    process.exit(1);
  }, 30_000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Docker / Kubernetes stop
process.on("SIGINT", () => gracefulShutdown("SIGINT")); // Ctrl-C in dev

/**
 * Log and exit on truly unexpected failures so a process manager can restart.
 */
process.on("uncaughtException", (err: Error) => {
  console.error("[uncaughtException] Unhandled exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: unknown) => {
  console.error("[unhandledRejection] Unhandled promise rejection:", reason);
  process.exit(1);
});

export default server;
