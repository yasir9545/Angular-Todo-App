import { Injectable } from '@angular/core';
import { Todo } from '../Model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string, description: string, date: string): void {
    const newTodo: Todo = {
      id: this.generateId(),
      title,
      description,
      date,
    };
    this.todos.push(newTodo);
  }

  updateTodo(id: number, title: string, description: string, date: string): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo.date = date;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  private generateId(): number {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }
}
