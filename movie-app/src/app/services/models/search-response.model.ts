import { MovieResponse } from './movie-response.model';

export interface SearchResponse {
  Search: MovieResponse[];
  Response: string;
  Error: string;
}
