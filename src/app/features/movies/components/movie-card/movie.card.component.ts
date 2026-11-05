import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions,
  MatCardImage
} from '@angular/material/card';

import { environment } from './../../../../../environments/environment';
import { Movie } from './../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: 'movie.card.component.html',
  styleUrls: ['movie.card.component.scss', '../../../../app.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage
  ]
})

export class MovieCardComponent {
  public movie = input.required<Movie>();
  public imageBaseUrl: string;

  constructor() {
    this.imageBaseUrl = environment.imageBaseUrl;
  }
}
