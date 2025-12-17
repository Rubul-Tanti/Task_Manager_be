import jwt from "jsonwebtoken";
import env from "../config/env_config";

export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, env.jwt_access_secret, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, env.jwt_refresh_secret, {
    expiresIn: "7d",
  });
};
