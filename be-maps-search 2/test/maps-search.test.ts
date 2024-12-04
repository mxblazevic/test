import { config } from "dotenv";
import { describe, expect, it } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";
import {
  buildParams,
  buildAutocompletions,
  buildCompletionAnswer,
} from "../src/helpers";
import { getEnvVars } from "../src/vars";
import { AutocompleteAnswer } from "../src/interfaces/autocomplete";

config();

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise<AutocompleteAnswer>);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      if (res.status == "Successful") {
        const firstRes = res.autocompletions[0];
        expect(firstRes).toHaveProperty("placeId");
        expect(firstRes).toHaveProperty("streetNumber");
        expect(firstRes).toHaveProperty("countryCode");
        expect(firstRes).toHaveProperty("country");
        expect(firstRes).toHaveProperty("freeformAddress");
        expect(firstRes).toHaveProperty("streetName");
        expect(firstRes).toHaveProperty("municipality");
        expect(firstRes).toHaveProperty("placeLattitude");
        expect(firstRes).toHaveProperty("placeLongitude");
      }
    });

    it("cannot fetch from the autocomplete api", async () => {
      const OLD_ENV = { ...process.env };
      process.env["TOMTOM_API_KEY"] = "someRandomWord";
      const res = await getAutoCompleteDetails("Charlotte Street");
      expect(res.autocompletions).toStrictEqual([]);
      expect(res.status).toStrictEqual("Failed");
      process.env = OLD_ENV;
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("handles no results", async () => {
      if (process.env.TOMTOM_API_KEY) {
        const res = await getPlaceAutocomplete(
          process.env.TOMTOM_API_KEY,
          "asfasffasfasafsafs",
          "AU"
        );
        expect(res).toStrictEqual([]);
      } else {
        expect(
          getPlaceAutocomplete(
            process.env.TOMTOM_API_KEY,
            "asfasffasfasafsafs",
            "AU"
          )
        ).rejects.toThrow();
      }
    });

    it("handles query error", async () => {
      expect(
        getPlaceAutocomplete(process.env.TOMTOM_API_KEY, "", "AU")
      ).rejects.toThrow();
    });

    it("handles undefined key error", async () => {
      expect(
        getPlaceAutocomplete(undefined, "holland", "AU")
      ).rejects.toThrow();
    });

    it("handles invalid key error", async () => {
      expect(
        getPlaceAutocomplete("someRandomWord", "holland", "AU")
      ).rejects.toThrow();
    });
  });

  describe("buildParams", () => {
    it("can build params", async () => {
      if (process.env.TOMTOM_API_KEY) {
        const res = await buildParams(process.env.TOMTOM_API_KEY, "AU");
        expect(res).toHaveProperty("key");
        expect(res).toHaveProperty("limit");
        expect(res).toHaveProperty("countrySet");
      }
    });

    it("doesnt have country", async () => {
      if (process.env.TOMTOM_API_KEY) {
        const res = await buildParams(process.env.TOMTOM_API_KEY, undefined);
        expect(res).toHaveProperty("key");
        expect(res).toHaveProperty("limit");
        expect(res).not.toHaveProperty("countrySet");
      }
    });

    it("doesnt have key", async () => {
      expect(buildParams(undefined, "AU")).rejects.toThrow();
    });
  });

  describe("buildCompletionAnswer", () => {
    it("can build library answer", async () => {
      const res = buildCompletionAnswer("Failed", [], "someError");
      expect(res).toHaveProperty("status");
      expect(res).toHaveProperty("message");
      expect(res).toHaveProperty("autocompletions");
      expect(res).toStrictEqual({
        status: "Failed",
        message: "someError",
        autocompletions: [],
      });
    });
  });

  describe("buildAutocompletions", () => {
    it("can build completions", async () => {
      const testTomTomResp = [
        {
          type: "Street",
          id: "gM_6v09hDcFSVpflxwy8Sw",
          score: 2.1169600487,
          address: {
            streetName: "Radison Avenue",
            municipality: "Sun City Center",
            countrySecondarySubdivision: "Hillsborough",
            countrySubdivision: "FL",
            countrySubdivisionName: "Florida",
            countrySubdivisionCode: "FL",
            postalCode: "33573",
            extendedPostalCode:
              "33573-8012, 33573-8014, 33573-8015, 33573-8017, 33573-8018, 33573-8020, 33573-8021, 33573-8023",
            countryCode: "US",
            country: "United States",
            countryCodeISO3: "USA",
            freeformAddress: "Radison Avenue, Sun City Center, FL 33573",
            localName: "Sun City Center",
          },
          position: {
            lat: 27.693119,
            lon: -82.377777,
          },
          viewport: {
            topLeftPoint: {
              lat: 27.6955,
              lon: -82.37859,
            },
            btmRightPoint: {
              lat: 27.6926,
              lon: -82.37509,
            },
          },
        },
        {
          type: "Street",
          id: "WCphMTK_XplQx1W7Bm_KQg",
          score: 2.0962057114,
          address: {
            streetName: "East Radison Run",
            municipality: "Clayton",
            countrySecondarySubdivision: "Kent",
            countrySubdivision: "DE",
            countrySubdivisionName: "Delaware",
            countrySubdivisionCode: "DE",
            postalCode: "19938",
            extendedPostalCode:
              "19938-3831, 19938-3832, 19938-3833, 19938-3834, 19938-3835, 19938-3836, 19938-3837, 19938-3838, 19938-3839, 19938-3840, 19938-3842, 19938-3843, 19938-3845, 19938-3847, 19938-3848",
            countryCode: "US",
            country: "United States",
            countryCodeISO3: "USA",
            freeformAddress: "East Radison Run, Clayton, DE 19938",
            localName: "Clayton",
          },
          position: {
            lat: 39.279368,
            lon: -75.627043,
          },
          viewport: {
            topLeftPoint: {
              lat: 39.28252,
              lon: -75.63093,
            },
            btmRightPoint: {
              lat: 39.27653,
              lon: -75.62576,
            },
          },
        },
      ];

      const res = await buildAutocompletions(testTomTomResp);
      expect(res).toHaveLength(2);
      expect(res[0]).toHaveProperty("placeId");
      expect(res[0]).toHaveProperty("streetNumber");
      expect(res[0]).toHaveProperty("countryCode");
      expect(res[0]).toHaveProperty("country");
      expect(res[0]).toHaveProperty("freeformAddress");
      expect(res[0]).toHaveProperty("streetName");
      expect(res[0]).toHaveProperty("municipality");
      expect(res[0]).toHaveProperty("placeLattitude");
      expect(res[0]).toHaveProperty("placeLongitude");
    });
  });

  describe("getEnvVars", () => {
    it("undefined key", async () => {
      const OLD_ENV = { ...process.env };
      process.env["TOMTOM_API_KEY"] = undefined;
      expect(() => getEnvVars()).toThrow(
        new Error("You should set proper API key!")
      );
      process.env = OLD_ENV;
    });

    it("empty key", async () => {
      const OLD_ENV = { ...process.env };
      process.env["TOMTOM_API_KEY"] = "";
      expect(() => getEnvVars()).toThrow(
        new Error("You should set proper API key!")
      );
      process.env = OLD_ENV;
    });
  });
});
