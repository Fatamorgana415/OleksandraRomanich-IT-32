import { Component } from '@angular/core';

interface Student {
  name: string;
  age: number;
  grade: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Студенти групи';

  students: Student[] = [
    {
      name: 'Анна',
      age: 18,
      grade: 11
    },
    {
      name: 'Максим',
      age: 17,
      grade: 7
    },
    {
      name: 'Олег',
      age: 18,
      grade: 5
    }
  ];

  newStudent: Student = {
    name: '',
    age: 0,
    grade: 0
  };

  addStudent(): void {
    if (
      this.newStudent.name.trim() === '' ||
      this.newStudent.age <= 0 ||
      this.newStudent.grade < 1 ||
      this.newStudent.grade > 12
    ) {
      return;
    }

    this.students.push({
      name: this.newStudent.name.trim(),
      age: this.newStudent.age,
      grade: this.newStudent.grade
    });

    this.clearForm();
  }

  deleteStudent(index: number): void {
    this.students.splice(index, 1);
  }

  clearForm(): void {
    this.newStudent = {
      name: '',
      age: 0,
      grade: 0
    };
  }

  getGradeClass(grade: number): string {
    if (grade >= 10) {
      return 'high-grade';
    }

    if (grade >= 7) {
      return 'middle-grade';
    }

    return 'low-grade';
  }
}