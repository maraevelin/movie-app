import { MovieResponse } from './MovieResponse';

export interface SearchResponse {
  Search: MovieResponse[];
  Response: string;
  Error: string;
}
