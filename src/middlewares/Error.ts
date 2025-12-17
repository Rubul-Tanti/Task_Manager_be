import { Request, Response, NextFunction } from "express";

// Custom API Error class
export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async wrapper to catch errors in async routes
export const asyncError = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Global error handler middleware
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err); // good for debugging

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "Error",
      message: "Validation Error",
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(404).json({
      status: "Error",
      message: "Invalid route: " + req.url,
    });
  }

  // Default fallback
  return res.status(500).json({
    status: "Error",
    message: "An unexpected error occurred",
  });
};
