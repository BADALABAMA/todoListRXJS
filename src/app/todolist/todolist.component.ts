import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ITodos, Status } from '../interfaces/ITodo';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

import { MatSelectModule } from '@angular/material/select';

import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatRadioModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterOutlet,
  ],

  providers: [provideNativeDateAdapter()],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  public todos$: Observable<ITodos[]>;
  public filteredTodos$: Observable<ITodos[]>;
  public sortedTodos$: Observable<ITodos[]>;
  public status: string = Status.ToDo;
  public selectedStatus: string = Status.ToDo;
  public totalTodo: ITodos[] = [];
  public pageSize = 10;
  public pageIndex = 1;

  constructor(private todoService: TodoService, private router: Router) {
    this.todos$ = this.todoService.getTodoList();
    this.filteredTodos$ = this.todoService.getFilteredTodos();
    this.sortedTodos$ = this.todoService.getSortedTodos();

    this.todos$.subscribe((data) => {
      this.totalTodo = data;
      console.log(this.totalTodo);
    });
  }

  public pageChanged(event: any) {
    this.pageIndex = event.pageIndex + 1;
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.todos$ = this.todoService
      .getTodoList()
      .pipe(map((todos) => todos.slice(startIndex, endIndex)));
  }

  ngOnInit() {
    this.todos$ = this.todoService.getFilteredTodos();
  }
  public addNewTask(form: NgForm) {
    this.todoService.addNewTodo(form.value);
  }

  public sortTodos() {
    this.todoService.sortTodos();
  }

  public deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  public editTodo(id: string, form: NgForm) {
    this.todoService.editTodo(id, form.value);
  }

  public filterTodo(status: string) {
    this.todoService.filterTodo(status);
  }

  public link() {
    this.todoService.isBrokenPlans();

    this.router.navigate(['/broken-plans']);
  }
}
