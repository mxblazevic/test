export interface TomTomParams {
  key?: string;
  limit: number;
  countrySet?: string;
}

export interface AddressObject {
  streetName?: string;
  streetNumber?: string;
  municipality: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
}

export interface PositionObject {
  lat: number;
  lon: number;
}

export interface TomTomResultObject {
  id: string;
  address: AddressObject;
  position: PositionObject;
}
