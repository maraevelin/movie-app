import { Movie } from './Movie';

export interface SearchResponse {
  Search: Movie[];
  Response: string;
  Error: string;
}
