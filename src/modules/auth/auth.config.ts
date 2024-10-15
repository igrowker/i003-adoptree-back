import * as Joi from "joi";
import { registerAs } from "@nestjs/config";

export const AUTH_CONFIG_KEY = "auth";

export const AuthEnvSchema = {
  JWT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
};

export const AuthConfig = registerAs(AUTH_CONFIG_KEY, () => ({
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
}));
