import { EnvVars } from "./interfaces/envs";
import { config } from "dotenv";

config();

export function getEnvVars(): EnvVars {
  const envVars: EnvVars = {
    apiKey: process.env.TOMTOM_API_KEY,
    countrySet: process.env.COUNTRY_SET,
  };

  return envVars;
}
