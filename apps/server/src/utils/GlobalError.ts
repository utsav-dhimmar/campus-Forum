import { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError.js";

export default function GlobalErrorHandler(
  error: any,
  _: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(error);
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error instanceof ApiError ? error.message : "Internal server error";
  return res.status(statusCode).json({ success: false, message });
}
