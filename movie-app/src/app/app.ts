import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = '';
  year = 0;
  rating = 0;

  constructor(public movieService: MovieService) {}

  add() {
    if (!this.title.trim()) return;

    this.movieService.addMovie(this.title, this.year, this.rating);

    this.title = '';
    this.year = 0;
    this.rating = 0;
  }

  remove(id: number) {
    this.movieService.removeMovie(id);
  }
}