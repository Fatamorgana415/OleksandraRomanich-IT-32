import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
}

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;

  private movies: Movie[] = [
    { id: 1, title: 'Interstellar', year: 2014, rating: 9 },
    { id: 2, title: 'Avatar', year: 2009, rating: 8 },
    { id: 3, title: 'Titanic', year: 1997, rating: 7 }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = this.movies.find(m => m.id === id);
  }
}