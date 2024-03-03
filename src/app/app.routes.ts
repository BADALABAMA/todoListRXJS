import { Routes } from '@angular/router';
import { BrokenPlansComponent } from './broken-plans/broken-plans.component';
import { TodolistComponent } from './todolist/todolist.component';

export const routes: Routes = [
  { path: 'broken-plans', component: BrokenPlansComponent },
  { path: '', component: TodolistComponent },
];
