import axios from "axios";
import { TomTomParams, TomTomResultObject } from "./interfaces/tomtom";
import { Place } from "./interfaces/place";
import { buildParams } from "./helpers";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
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

  return autocomplete.data.results.map(
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
