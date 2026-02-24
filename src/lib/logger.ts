import * as HyperDX from "@hyperdx/node-opentelemetry";
import winston from "winston";

import env from "@/config/env";

// ─── Constants ────────────────────────────────────────────────────────────────

const IS_PRODUCTION = env.NODE_ENV === "production";
const LOG_LEVEL = env.LOG_LEVEL ?? (IS_PRODUCTION ? "info" : "debug");

// ─── Custom Formats ───────────────────────────────────────────────────────────

/**
 * Pretty-printed, coloured format for local development.
 * Example:  2026-02-24 10:21:45 [INFO ] [AuthService] User logged in
 */
const devFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    const ctx = context ? ` [${String(context)}]` : "";

    return `${String(timestamp)} ${level}${ctx}: ${String(message)}`;
  }),
);

/**
 * Structured JSON format for production log aggregators.
 * Every field is explicit; no `splat` noise.
 */
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// ─── Transports ───────────────────────────────────────────────────────────────

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: IS_PRODUCTION ? prodFormat : devFormat,
  }),
];

/**
 * HyperDX OpenTelemetry transport – only active when an API key is provided.
 * Ships logs to HyperDX via OTLP; works alongside traces & metrics from the
 * same SDK, giving you correlated observability out of the box.
 *
 * @see https://www.hyperdx.io/docs/install/javascript
 */
if (env.HYPERDX_API_KEY) {
  transports.push(
    HyperDX.getWinstonTransport(LOG_LEVEL, {
      detectResources: true,
    }),
  );
}

// ─── Logger Instance ──────────────────────────────────────────────────────────

const logger = winston.createLogger({
  level: LOG_LEVEL,
  defaultMeta: {
    service: "restaurant-management-backend",
    environment: env.NODE_ENV,
  },
  transports,

  /**
   * In production, silence the logger if no transports are configured
   * so unintentional console noise never leaks.
   */
  silent: false,
});

export default logger;
