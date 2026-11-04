/**
 * @description Represents structure from single "movie" object.
 */
export interface Movie {
  id: number;
  overview: string;
  poster_path?: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

/**
 * @description Structure from "success response" for movies search. 
 */
export interface MovieResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}
