import { Injectable } from '@angular/core';
import type { Todo } from '../Model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  getTodos() {
    return [...this.todos];
  }

  addTodo(title: string) {
    this.todos.push({ id: this.nextId++, title });
  }

  updateTodo(id: number, title: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = title;
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
