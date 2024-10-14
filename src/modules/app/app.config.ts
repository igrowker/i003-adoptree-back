import * as Joi from "joi";
import { registerAs } from "@nestjs/config";

export const AppEnvSchema = {
  DB_LOGS: Joi.string(),
  FRONT_PROTOCOL: Joi.string().required(),
  FRONT_DOMAIN: Joi.string().required(),
};

export const AppConfig = registerAs("app", () => ({
  dbLogs: process.env.DB_LOGS === "true",
  frontProtocol: process.env.FRONT_PROTOCOL,
  frontDomain: process.env.FRONT_DOMAIN,
}));
