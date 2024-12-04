import { Place } from "./interfaces/place";
import { TomTomParams, TomTomResultObject } from "./interfaces/tomtom";
import { config } from "dotenv";
import { AutocompleteAnswer } from "./interfaces/autocomplete";

config();

/**
 * Build parameter object to send as query parameters with get request to TomTom API
 *
 * @param {string} key TomTom API key.
 * @param {string} countrySet Comma separated values of a countries we're limiting our search for.
 * @return {Promise<TomTomParams>} Parameters to pass to TomTom API get request
 */
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

/**
 * Parse TomTom request
 *
 * @param {TomTomResultObject[]} tomTomResults TomTom get request response.
 * @return {Promise<Place[]>} Parsed response
 */
export async function buildAutocompletions(
  tomTomResults: TomTomResultObject[]
): Promise<Place[]> {
  return tomTomResults.map(
    ({
      id,
      address: {
        streetName,
        streetNumber,
        municipality,
        countryCode,
        country,
        freeformAddress,
      },
      position: { lat, lon },
    }: TomTomResultObject) => ({
      placeId: id,
      placeLattitude: lat,
      placeLongitude: lon,
      streetName,
      streetNumber,
      municipality,
      countryCode,
      country,
      freeformAddress,
    })
  );
}

/**
 * Builds library answer
 *
 * @param {string} status Failed or Successful
 * @param {Place[]} autocompletions Parsed autocompletions from TomTom API
 * @param {string} errorMessage Error indicator
 * @return {AutocompleteAnswer} Status, message, and completions
 */
export function buildCompletionAnswer(
  status: string,
  autocompletions: Place[],
  errorMessage: string
): AutocompleteAnswer {
  return {
    status,
    message: status == "Successful" ? "No errors" : errorMessage,
    autocompletions,
  };
}
