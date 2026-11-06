import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { MovieDetails, MovieResponse } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);

  /**
   * @description Executes a request to get current popular movies.
   * @returns {Observable<MovieResponse>} An observable that contains search response.
   */
  public getPopularMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${environment.apiUrl}/movie/popular`, this.getRequestHeaders());
  }

  /**
   * @description Executes a request to search movies by query.
   * @param {string} query - Value to match with movies.
   * @returns {Observable<MovieResponse>} An observable that contains search response.
   */
  public searchMovies(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${environment.apiUrl}/search/movie?query=${query}`, this.getRequestHeaders());
  }

  /**
   * @description Sets bearer token in header to execute request to TMDB Api.
   * @returns {object} An object with headers data
   */
  private getRequestHeaders(): object {
    return { headers: { Authorization: `Bearer ${environment.apiToken}` } };
  }

  /**
   * @description Executes a request to get movie details.
   * @param {number} movieId - Movie identifier.
   * @returns {Observable<MovieDetails>} An observable containing movie details.
   */
  public getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${environment.apiUrl}/movie/${movieId}`,this.getRequestHeaders()
    );
  }
}
