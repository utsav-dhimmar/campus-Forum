import { Request, Response, NextFunction } from "express";

export default function logger(req: Request, res: Response, next: NextFunction) {
  console.log({
    method: req.method,
    url: req.url,
    responseStatus: res.statusCode,
  });
  next();
}
