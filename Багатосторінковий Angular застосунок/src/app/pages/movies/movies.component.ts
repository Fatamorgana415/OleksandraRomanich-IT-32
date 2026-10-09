import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Список фільмів</h1>
    <div *ngFor="let movie of movies" style="margin-bottom: 8px;">
      <b>{{ movie.title }}</b> — {{ movie.director }}
      <a [routerLink]="['/movie', movie.id]">[Детальніше]</a>
    </div>
  `
})
export class MoviesComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
    this.movies = this.movieService.getItems();
  }
}
