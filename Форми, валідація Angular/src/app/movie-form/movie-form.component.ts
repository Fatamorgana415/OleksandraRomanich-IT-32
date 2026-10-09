import { Component } from '@angular/core';

interface Movie {
  title: string;
  director: string;
  description: string;
}

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  newItem: Movie = {
    title: '',
    director: '',
    description: ''
  };

  movies: Movie[] = [];

  submitted = false;

  addItem(form: any): void {
    this.submitted = true;

    if (form.invalid) {
      return;
    }

    this.movies.push({ ...this.newItem });

    form.resetForm();
    this.submitted = false;
  }
}