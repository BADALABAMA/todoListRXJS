import { Injectable } from '@angular/core';
import { ITodos } from './interfaces/ITodo';
import { BehaviorSubject, Observable } from 'rxjs';
import { addDays } from './utils/functions';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todoList: BehaviorSubject<ITodos[]> = new BehaviorSubject<ITodos[]>(
    []
  );

  private _filteredTodos: BehaviorSubject<ITodos[]> = new BehaviorSubject<
    ITodos[]
  >([]);

  private _sortedTodos: BehaviorSubject<ITodos[]> = new BehaviorSubject<
    ITodos[]
  >([]);

  private _brokenPlans: BehaviorSubject<ITodos[]> = new BehaviorSubject<
    ITodos[]
  >([]);

  private todos$: Observable<ITodos[]> = this._todoList.asObservable();

  private filteredTodos$: Observable<ITodos[]> =
    this._filteredTodos.asObservable();

  private sortedTodos$: Observable<ITodos[]> = this._sortedTodos.asObservable();

  private brokenPlans$: Observable<ITodos[]> = this._brokenPlans.asObservable();

  private sortOrder: 'asc' | 'desc' = 'desc';

  constructor() {}

  public getTodoList() {
    return this.todos$;
  }

  public getFilteredTodos() {
    return this.filteredTodos$;
  }
  public getSortedTodos() {
    return this.sortedTodos$;
  }
  public getBrokenPlans() {
    return this.brokenPlans$;
  }

  public addNewTodo(todo: ITodos) {
    const todoValues = this._todoList.value;
    const newTodo: ITodos = {
      id: Math.random().toString().slice(3, 9),
      date: todo.date || new Date(),
      title: todo.title,
      description: todo.description,
      status: todo.status,
    };

    this._todoList.next([...todoValues, newTodo]);
    this.filterTodo();
  }

  public deleteTodo(todoId: string): void {
    this._todoList.next(
      this._todoList.getValue().filter((todo) => todo.id !== todoId)
    );
    this.filterTodo();
  }

  public editTodo(todoId: string, editedTodo: ITodos): void {
    const todoIndex = this._todoList
      .getValue()
      .findIndex((todo) => todo.id === todoId);

    if (todoIndex !== -1) {
      this._todoList.next(
        this._todoList
          .getValue()
          .map((todo, index) =>
            index === todoIndex ? { ...todo, ...editedTodo } : todo
          )
      );
      this.filterTodo();
    }
  }

  public filterTodo(status?: string): void {
    const allTodos = this._todoList.getValue();
    if (!status) {
      this._filteredTodos.next(allTodos);
    } else {
      const filteredTodos = allTodos.filter((todo) => todo.status === status);
      this._filteredTodos.next(filteredTodos);
    }
  }
  private toggleSort() {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
  }
  public sortTodos(): void {
    this.toggleSort();
    const allTodos = this._todoList.getValue();

    const sortedTodos = allTodos.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (this.sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    this._filteredTodos.next(sortedTodos);
  }

  public equalTheDate(dateA: Date): boolean {
    const threeDaysLater = addDays(dateA, 3);
    const currentDate = new Date();
    return threeDaysLater <= currentDate;
  }

  public isBrokenPlans() {
    const allTodos = this._todoList.getValue();

    const brokenPlans = allTodos.filter((todo) => {
      const dateA = new Date(todo.date);

      return this.equalTheDate(dateA);
    });

    brokenPlans.find((todo) => {
      this.deleteTodo(todo.id);
    });
    this.filterTodo();
    this._brokenPlans.next([...brokenPlans]);
  }
}
