import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(requestHandler(req, res, next));
    } catch (error: any) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
        success: false,
      });
    }
  };
};

export default asyncHandler;
