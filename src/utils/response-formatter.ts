import type { Response } from "express";

type TSuccessStatus = "success";
type TErrorStatus = "error";

type TBaseResponse<TStatus extends TSuccessStatus | TErrorStatus> = {
  status: TStatus;
  timestamp: string;
};

export type TSuccessResponse<TData = unknown> =
  TBaseResponse<TSuccessStatus> & {
    data?: TData;
    message: string;
  };

export type TErrorResponse = TBaseResponse<TErrorStatus> & {
  message: string;
  statusCode: number;
  details?: unknown;
  error?: string;
  stack?: string;
};

export function formatSuccessResponse<TData>(
  message: string,
  data?: TData,
): TSuccessResponse<TData> {
  const response: TSuccessResponse<TData> = {
    message,
    status: "success",
    timestamp: new Date().toISOString(),
  };

  if (data !== undefined) {
    response.data = data;
  }

  return response;
}

export function formatErrorResponse(
  statusCode: number,
  message: string,
  options?: {
    details?: unknown;
    error?: string;
    stack?: string;
  },
): TErrorResponse {
  const response: TErrorResponse = {
    message,
    status: "error",
    statusCode,
    timestamp: new Date().toISOString(),
  };

  if (options?.details !== undefined) {
    response.details = options.details;
  }

  if (options?.error !== undefined) {
    response.error = options.error;
  }

  if (options?.stack !== undefined) {
    response.stack = options.stack;
  }

  return response;
}

export function sendSuccessResponse<TData>(
  res: Response,
  statusCode = 200,
  details: {
    message: string;
    data?: TData;
  },
): Response<TSuccessResponse<TData>> {
  const payload = formatSuccessResponse(details.message, details.data);

  return res.status(statusCode).json(payload);
}

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  options: {
    message: string;
    details?: unknown;
    error?: string;
    stack?: string;
  },
): Response<TErrorResponse> {
  const payload = formatErrorResponse(statusCode, options.message, options);

  return res.status(statusCode).json(payload);
}
