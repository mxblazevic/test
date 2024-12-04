import axios from "axios";
import { TomTomParams } from "./interfaces/tomtom";
import { Place } from "./interfaces/place";
import { buildParams, buildAutocompletions } from "./helpers";

/**
 * Creates list of autocompletions based on the partial address. It uses TomTom API:
 * https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
 *
 * @param {string} key TomTom API key.
 * @param {string} address Address we're trying to generate autocompletions for.
 * @param {string} countrySet Comma separated values of a countries we're limiting our search for.
 * @return {Promise<Place[]>} Promise with array of autocompletion suggestions
 */
export async function getPlaceAutocomplete(
  key: string | undefined,
  address: string,
  countrySet: string | undefined
): Promise<Place[]> {
  const params: TomTomParams = await buildParams(key, countrySet);
  const autocomplete = await axios.get(
    `https://api.tomtom.com/search/2/search/${address}.json'`,
    {
      params,
    }
  );

  return await buildAutocompletions(autocomplete.data.results);
}
