import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { MovieCardComponent } from '../../components/movie-card/movie.card.component';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  templateUrl: 'movies.page.component.html',
  styleUrls: ['movies.page.component.scss', '../../../../app.scss'],
  imports: [MatProgressSpinner, MovieCardComponent]
})

export class MoviesPageComponent implements OnInit {
  public error = signal(null);
  public isLoading = signal<boolean>(false);
  public movies = signal<Array<Movie>>([]);

  private movieService = inject(MovieService);

  /**
   * @description A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  public ngOnInit() {
    this.isLoading.set(true)
    this.getPopularMovies();
    this.isLoading.set(false)
  }

  /**
   * @description Gets current popular movies.
   */
  private getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies.set(response.results);
      },
      error: (error) => {
        this.error.set(error)
      }
    })
  }
}
