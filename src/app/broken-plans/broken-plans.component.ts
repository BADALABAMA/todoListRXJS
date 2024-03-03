import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ITodos } from '../interfaces/ITodo';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broken-plans',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './broken-plans.component.html',
  styleUrl: './broken-plans.component.scss',
})
export class BrokenPlansComponent implements OnInit, OnDestroy {
  public todos$: Observable<ITodos[]>;

  public brokenPlans: ITodos[] = [];

  constructor(private todoService: TodoService, private router: Router) {
    this.todos$ = this.todoService.getBrokenPlans();

    this.todos$.subscribe((brokenPlans) => {
      this.brokenPlans = brokenPlans;
      console.log(brokenPlans);
    });
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {}

  public redirect() {
    this.router.navigate(['']);
  }
}
