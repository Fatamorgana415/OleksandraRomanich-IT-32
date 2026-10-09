import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div *ngIf="movie; else notFound">
      <h1>{{ movie.title }}</h1>
      <p><b>Режисер:</b> {{ movie.director }}</p>
      <p><b>Опис:</b> {{ movie.description }}</p>
      <a routerLink="/movies">← Назад</a>
    </div>
    <ng-template #notFound>
      <h2>Фільм не знайдено</h2>
      <a routerLink="/movies">← Назад</a>
    </ng-template>
  `
})
export class MovieDetailComponent {
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.movie = this.movieService.getItemById(id);
    });
  }
}