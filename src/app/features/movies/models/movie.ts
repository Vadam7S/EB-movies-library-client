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

/**
 * @description Represents detailed information from a movie.
 */
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  tagline: string | null;
  genres: Array<Genre>;
}

/**
 * @description Represents structure from single Genre object.
 */
export interface Genre {
  id: number;
  name: string;
}
