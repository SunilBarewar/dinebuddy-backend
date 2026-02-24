import type { Response } from "express";
import status from "http-status";
import type { ValidationError } from "zod-express-validator";
import { sendErrorResponse } from "@/utils/response-formatter";

export function onValidationError<P, Q, B>(
  { bodyError, paramsError, queryError }: ValidationError<P, Q, B>,
  res: Response,
) {
  const error = bodyError ?? paramsError ?? queryError;
  const details = error?.message ? JSON.parse(error.message) : undefined;

  return sendErrorResponse(res, status.BAD_REQUEST, {
    details,
    message: "Validation error",
  });
}
