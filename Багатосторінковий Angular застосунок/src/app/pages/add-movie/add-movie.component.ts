import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Додати фільм</h1>
    <form #movieForm="ngForm" (ngSubmit)="onSubmit(movieForm)">
      <div>
        <label>Назва:</label>
        <input name="title" [(ngModel)]="title" #titleRef="ngModel"
               required minlength="3" maxlength="50" />
        <div *ngIf="submitted && titleRef.invalid">
          <small *ngIf="titleRef.errors?.['required']">Поле обов'язкове</small>
          <small *ngIf="titleRef.errors?.['minlength']">Мінімум 3 символи</small>
          <small *ngIf="titleRef.errors?.['maxlength']">Максимум 50 символів</small>
        </div>
      </div>

      <div>
        <label>Режисер:</label>
        <input name="director" [(ngModel)]="director" #directorRef="ngModel"
               required minlength="3" maxlength="50" />
        <div *ngIf="submitted && directorRef.invalid">
          <small *ngIf="directorRef.errors?.['required']">Поле обов'язкове</small>
          <small *ngIf="directorRef.errors?.['minlength']">Мінімум 3 символи</small>
          <small *ngIf="directorRef.errors?.['maxlength']">Максимум 50 символів</small>
        </div>
      </div>

      <div>
        <label>Опис:</label>
        <textarea name="description" [(ngModel)]="description" #descRef="ngModel"
                  required minlength="10"></textarea>
        <div *ngIf="submitted && descRef.invalid">
          <small *ngIf="descRef.errors?.['required']">Поле обов'язкове</small>
          <small *ngIf="descRef.errors?.['minlength']">Мінімум 10 символів</small>
        </div>
      </div>

      <button type="submit">Додати</button>
    </form>
  `
})
export class AddMovieComponent {
  submitted = false;
  title = '';
  director = '';
  description = '';

  constructor(private movieService: MovieService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;

    this.movieService.addItem({
      title: this.title,
      director: this.director,
      description: this.description
    });

    form.resetForm();
    this.submitted = false;
    this.router.navigate(['/movies']);
  }
}