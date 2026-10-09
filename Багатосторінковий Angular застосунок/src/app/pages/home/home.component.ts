import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Каталог фільмів</h1>
    <p>Ласкаво просимо! Оберіть дію:</p>
    <a routerLink="/movies">Переглянути фільми</a>
  `
})
export class HomeComponent {}