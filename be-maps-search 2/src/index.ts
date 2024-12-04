import { getPlaceAutocomplete } from "./maps-api";
import { getEnvVars } from "./vars";
import { buildCompletionAnswer } from "./helpers";
import { Place } from "./interfaces/place";
import { EnvVars } from "./interfaces/envs";
import { AutocompleteAnswer } from "./interfaces/autocomplete";

/**
 * Creates a new Circle from a diameter.
 *
 * @param {string} address Address we're trying to generate autocompletions for.
 * @return {Promise<Place[]>} Promise with array of autocompletion suggestions
 */
export async function getAutoCompleteDetails(
  address: string
): Promise<AutocompleteAnswer> {
  try {
    const { apiKey, countrySet }: EnvVars = getEnvVars();
    // get autocomplete results
    const autocompleteResults: Place[] = await getPlaceAutocomplete(
      apiKey,
      address,
      countrySet
    );
    return buildCompletionAnswer(
      "Successful",
      autocompleteResults,
      "No errors"
    );
  } catch (err: any) {
    return buildCompletionAnswer("Failed", [], err.message);
  }
}
