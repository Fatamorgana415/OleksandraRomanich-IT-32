import { Injectable, signal } from '@angular/core';

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies = signal<Movie[]>([
    { id: 1, title: 'Interstellar', year: 2014, rating: 9 },
    { id: 2, title: 'Avatar', year: 2009, rating: 8 },
    { id: 3, title: 'Inception', year: 2010, rating: 9 }
  ]);

  getMovies() {
    return this.movies;
  }

  addMovie(title: string, year: number, rating: number) {
    const newMovie: Movie = {
      id: this.movies().length + 1,
      title,
      year,
      rating
    };
    this.movies.update(list => [...list, newMovie]);
  }

  removeMovie(id: number) {
    this.movies.update(list => list.filter(m => m.id !== id));
  }
}