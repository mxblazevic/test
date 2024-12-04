import { EnvVars } from "./interfaces/envs";
import { config } from "dotenv";

config();

/**
 * Getting environment variables from .env
 *
 * @return {EnvVars} Object with environment variables
 */
export function getEnvVars(): EnvVars {
  const envVars: EnvVars = {
    apiKey: process.env.TOMTOM_API_KEY,
    countrySet: process.env.COUNTRY_SET,
  };

  if (!envVars.apiKey) {
    throw new Error("You should set proper API key!");
  }

  return envVars;
}
