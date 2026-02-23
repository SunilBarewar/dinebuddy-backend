import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandler = (
  req: Request<any, any, any, any>,
  res: Response<any, any>,
  next: NextFunction,
) => any;

export const asyncHandler = (
  handler: AsyncHandler,
): RequestHandler<any, any, any, any> => {
  return (req, res, next) => {
    void handler(req, res, next).catch(next);
  };
};
