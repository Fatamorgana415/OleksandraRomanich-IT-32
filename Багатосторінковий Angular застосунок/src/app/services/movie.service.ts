import { Injectable } from '@angular/core';

export interface Movie {
  id: number;
  title: string;
  director: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: Movie[] = [
    { id: 1, title: 'Interstellar', director: 'Christopher Nolan', description: 'Науково-фантастичний фільм про космос' },
    { id: 2, title: 'Avatar', director: 'James Cameron', description: 'Фантастичний фільм про планету Пандора' },
    { id: 3, title: 'Inception', director: 'Christopher Nolan', description: 'Фільм про сни та викрадення ідей' }
  ];

  getItems(): Movie[] {
    return this.movies;
  }

  getItemById(id: number): Movie | undefined {
    return this.movies.find(m => m.id === id);
  }

  addItem(movie: Omit<Movie, 'id'>): void {
    const newId = this.movies.length ? Math.max(...this.movies.map(m => m.id)) + 1 : 1;
    this.movies.push({ id: newId, ...movie });
  }
}
