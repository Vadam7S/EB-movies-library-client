import { Component, input } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { environment } from './../../../../../environments/environment';
import { Movie } from './../../models/movie';
import { movieCardConstants, MovieCardLabels } from './movie.card.constants';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie.details.dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: 'movie.card.component.html',
  styleUrls: ['movie.card.component.scss', '../../../../app.scss'],
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    DecimalPipe,
    DatePipe
  ]
})

export class MovieCardComponent {
  public labels = MovieCardLabels;
  public imageBaseUrl: string = environment.imageBaseUrl + movieCardConstants.posterDimention;
  public movie = input.required<Movie>();

  private dialog = inject(MatDialog);

  /**
   * @description Open a dialog to display extra data about movie selected.
   */
  public openDetails(): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        movieId: this.movie().id
      },
      width: movieCardConstants.dialogDetailsWidth,
      maxWidth: movieCardConstants.dialogDetailsMaxWidth,
      maxHeight: movieCardConstants.dialogDetailsMaxHeight,
      disableClose: true
    });
  }
}
