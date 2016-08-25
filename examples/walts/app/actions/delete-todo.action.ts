import { Injectable } from '@angular/core';
import { Actions, Action } from 'walts';

import { AppState } from '../app.store';
import { TodosRepository } from '../todos.repository';
import { UpdateTodosAction } from './update-todos.action';

@Injectable()
export class DeleteTodoAction extends Actions<AppState> {
  constructor(private repository: TodosRepository,
              private updateTodos: UpdateTodosAction) {
    super();
  }

  create(id: number): Action<AppState>[] {
    return this.combine(
      (state) => {
        this.repository.deleteTodo(id);
        return state;
      },
      this.updateTodos.create()
    );
  }
}
