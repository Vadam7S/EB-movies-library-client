import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';

import { finalize } from 'rxjs';

import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie.card.component';
import { MovieService } from '../../services/movie.service';
import { moviesPageConstants, MoviesPageLabels, TmdbErrorCodes } from './movies.page.constants';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  templateUrl: 'movies.page.component.html',
  styleUrls: ['movies.page.component.scss', '../../../../app.scss'],
  imports: [
    MatProgressSpinner,
    MovieCardComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatPrefix,
    MatButton,
    FormsModule,
    MatSnackBarModule,
    NgClass
  ]
})

export class MoviesPageComponent implements OnInit {
  public errorMessage = signal(moviesPageConstants.emptyString);
  public isLoading = signal<boolean>(false);
  public labels = MoviesPageLabels;
  public movies = signal<Array<Movie>>([]);
  public searchQuery = moviesPageConstants.emptyString;
  public pageTitle = signal<string>(moviesPageConstants.emptyString);

  private movieService = inject(MovieService);
  private snackBar = inject(MatSnackBar);

  /**
   * @description A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  public ngOnInit() {
    this.isLoading.set(true);
    this.errorMessage.set(moviesPageConstants.emptyString);
    this.getPopularMovies();
  }

  /**
   * @description triggers a search by query entered if data exists, otherwise searchs popular movies.
   */
  public onSearch(): void {
    const query = this.searchQuery?.trim();
    this.errorMessage.set(moviesPageConstants.emptyString);

    if (query) {
      this.searchMovieByQuery(query);
    } else {
      this.getPopularMovies();
    }
  }

  /**
   * @description Executes petition to search a movie by especific query entered in search bar.
   * @param {string} query - Value to match coincidences with movies.
   */
  private searchMovieByQuery(query: string) {
    this.isLoading.set(true);
    this.movieService.searchMovies(query).pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.pageTitle.set(MoviesPageLabels.searchResults + query);
        this.movies.set(response.results);
      },
      error: (error) => {
        this.pageTitle.set(MoviesPageLabels.error);
        this.showError(error);
      }
    })
  }

  /**
   * @description Gets current popular movies.
   */
  private getPopularMovies(): void {
    this.movieService.getPopularMovies().pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.pageTitle.set(MoviesPageLabels.popularMovies);
        this.movies.set(response.results);
      },
      error: (error) => {
      this.pageTitle.set(MoviesPageLabels.error);
      this.showError(error);      }
    })
  }

  /**
   * @description handles an error received in petition to TMDB API to display a message about that error.
   * @param {HttpErrorResponse} error - The error received from request.
   */
  private showError(error: HttpErrorResponse): void {
    this.errorMessage.set(MoviesPageLabels.unexpectedError.toString());

    switch (error.status) {
      case TmdbErrorCodes.connectionError:
        this.errorMessage.set(MoviesPageLabels.connectionError.toString());
        break;
      case TmdbErrorCodes.authenticationError:
        this.errorMessage.set(MoviesPageLabels.authenticationError.toString());
        break;
      case TmdbErrorCodes.permissionError:
        this.errorMessage.set(MoviesPageLabels.permissionError.toString());
        break;
      case TmdbErrorCodes.resourceNotFound:
        this.errorMessage.set(MoviesPageLabels.resourceNotFound.toString());
        break;
      case TmdbErrorCodes.tooManyRequests:
        this.errorMessage.set(MoviesPageLabels.tooManyRequests.toString());
        break;
      case TmdbErrorCodes.serviceUnavailable.errorCode500:
      case TmdbErrorCodes.serviceUnavailable.errorCode502:
      case TmdbErrorCodes.serviceUnavailable.errorCode503:
      case TmdbErrorCodes.serviceUnavailable.errorCode504:
        this.errorMessage.set(MoviesPageLabels.serviceUnavailable.toString());
        break;
    }

    this.snackBar.open(this.errorMessage(), MoviesPageLabels.close, {
      duration: moviesPageConstants.defaultMessageDuration,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
