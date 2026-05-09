import User, { IUserDocument } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { Request, NextFunction } from "express";
import { parsedEnv } from "../schemas/env.js";

const authMiddleware = asyncHandler(async (req: Request, _, next: NextFunction) => {
  try {
    const incommingAccessToken =
      req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!incommingAccessToken) {
      throw new ApiError(401, "unautorized access token not found");
    }

    const decoded = jwt.verify(incommingAccessToken, parsedEnv.ACCESS_TOKEN) as { _id: string };
    const isUser = await User.findById(decoded._id).select("-password -refreshToken");

    if (!isUser) {
      throw new ApiError(404, "user not found");
    }
    req.user = isUser as IUserDocument;
    next();
  } catch (error: any) {
    throw new ApiError(401, error.message || "invalid refresh token");
  }
});

export default authMiddleware;
