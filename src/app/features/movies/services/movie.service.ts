import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { MovieResponse } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);

  public getPopularMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${environment.apiUrl}/movie/popular`, { headers: { Authorization: `Bearer ${environment.apiToken}` }});
  }
}
