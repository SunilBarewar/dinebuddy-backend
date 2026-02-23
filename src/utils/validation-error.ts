import type { Response } from "express";
import status from "http-status";
import type { ValidationError } from "zod-express-validator";

export function onValidationError<P, Q, B>(
  { bodyError, paramsError, queryError }: ValidationError<P, Q, B>,
  res: Response,
) {
  const error = bodyError ?? paramsError ?? queryError;

  return res.status(status.BAD_REQUEST).json({
    message: error?.message ? JSON.parse(error.message) : "Validation error",
  });
}
