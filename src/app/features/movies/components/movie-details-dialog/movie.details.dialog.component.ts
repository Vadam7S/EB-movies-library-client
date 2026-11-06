import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog'
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { finalize } from 'rxjs';

import { MovieDetails } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { environment } from '../../../../../environments/environment';
import { movieDetailContants, MovieDetailLabels } from './movie.details.constants';

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: 'movie.details.dialog.component.html',
  standalone: true,
  styleUrls: ['movie.details.dialog.component.scss'],
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatProgressSpinner,
    DatePipe,
    DecimalPipe,
    MatDialogClose,
  ]
})
export class MovieDetailsDialogComponent implements OnInit {
  public error = signal<unknown | null>(null);
  public imageBaseUrl: string = environment.imageBaseUrl + movieDetailContants.posterDimention;
  public isLoading = signal<boolean>(true);
  public labels = MovieDetailLabels;
  public movie = signal<MovieDetails | null>(null);

  data = inject<{movieId: number}>(MAT_DIALOG_DATA);
  private movieService = inject(MovieService);

  /**
   * @description A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Excu
   */
  public ngOnInit(): void {
    this.getMovieDetails();
  }

  /**
   * @description Exewcutes a request with movieID to get extra data for details.
   */
  private getMovieDetails(): void {
    this.movieService.getMovieDetails(this.data.movieId).pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.movie.set(response);
      },
      error: (error) => {
        this.error.set(error);
      }
    })
  }
}
