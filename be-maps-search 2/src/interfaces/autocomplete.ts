import { Place } from "./place";

export interface AutocompleteAnswer {
  status: string;
  message: string;
  autocompletions: Place[];
}
