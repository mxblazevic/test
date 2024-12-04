export interface Place {
  placeId: string;
  placeLattitude: number;
  placeLongitude: number;
  streetName?: string;
  streetNumber?: string;
  municipality: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
}
