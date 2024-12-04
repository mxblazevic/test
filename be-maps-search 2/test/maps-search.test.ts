import { config } from "dotenv";
import { describe, expect, it } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";
import { buildParams } from "../src/helpers";
import { Place } from "../src/interfaces/place";

config();

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise<Place[]>);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(
        process.env.TOMTOM_API_KEY,
        "asfasffasfasafsafs",
        "AU"
      );
      expect(res).toStrictEqual([]);
    });

    it("handles error", async () => {
      expect(
        getPlaceAutocomplete(process.env.TOMTOM_API_KEY, "", "AU")
      ).rejects.toThrow();
    });

    it("handles key error", async () => {
      expect(
        getPlaceAutocomplete(undefined, "holland", "AU")
      ).rejects.toThrow();
    });

    it("handles country error", async () => {
      expect(
        getPlaceAutocomplete(process.env.TOMTOM_API_KEY, "holland", undefined)
      ).not.toHaveProperty("countrySet");
    });
  });

  describe("buildParams", () => {
    it("can build params", async () => {
      const res = await buildParams(process.env.TOMTOM_API_KEY, "AU");
      expect(res).toHaveProperty("key");
      expect(res).toHaveProperty("limit");
      expect(res).toHaveProperty("countrySet");
    });

    it("doesnt have country", async () => {
      const res = await buildParams(process.env.TOMTOM_API_KEY, undefined);
      expect(res).toHaveProperty("key");
      expect(res).toHaveProperty("limit");
      expect(res).not.toHaveProperty("countrySet");
    });

    it("doesnt have key", async () => {
      expect(buildParams(undefined, "AU")).rejects.toThrow();
    });
  });
});
