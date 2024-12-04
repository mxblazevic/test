import { getPlaceAutocomplete } from "./maps-api";
import { getEnvVars } from "./vars";
import { Place } from "./interfaces/place";
import { EnvVars } from "./interfaces/envs";

export async function getAutoCompleteDetails(
  address: string
): Promise<Place[]> {
  const { apiKey, countrySet }: EnvVars = getEnvVars();

  // get autocomplete results
  const autocompleteResults: Place[] = await getPlaceAutocomplete(
    apiKey,
    address,
    countrySet
  );

  return autocompleteResults;
}
