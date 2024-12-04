import { TomTomParams } from "./interfaces/tomtom";
import { config } from "dotenv";

config();

export async function buildParams(
  key: string | undefined,
  countrySet: string | undefined
): Promise<TomTomParams> {
  const params: TomTomParams = {
    limit: 100,
  };

  if (key !== undefined) {
    params.key = key;
  } else {
    throw new Error("API key not provided!");
  }

  if (countrySet !== undefined) {
    params.countrySet = countrySet;
  }

  return params;
}
