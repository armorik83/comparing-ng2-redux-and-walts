import { Injectable } from '@angular/core'
import { Todo } from './todo'

export type FilterType =
  'showAll' |
  'showActive' |
  'showCompleted'

export const FILTERS: string[] = [
  'All',
  'Active',
  'Completed'
]

export const MAP_FILTERS: {[key: string]: FilterType} = {
  All: 'showAll',
  Active: 'showActive',
  Completed: 'showCompleted',
}

@Injectable()
export class TodosRepository {
  private todos: Todo[]

  constructor() {
    this.todos = [{
      text: 'Use Angular 2 + Walts',
      completed: false,
      id: 0
    }]
  }

  addTodo(text: string) {
    const id = this.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
    const todo = {
      text,
      completed: false,
      id
    }

    this.todos.push(todo)
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  editTodo(id: number, text: string) {
    const todo = this.findTodo(id)
    todo.text = text
  }

  completeTodo(id: number) {
    const todo = this.findTodo(id)
    todo.completed = !todo.completed
  }

  completeAll() {
    const areAllMarked = this.todos.every((todo) => todo.completed)
    this.todos = this.todos.map((todo) => {
      todo.completed = !areAllMarked
      return todo
    })
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => todo.completed === false)
  }

  getAll(): Todo[] {
    return this.todos
  }

  completedCount(): number {
    return this.todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count
    }, 0)
  }

  activeCount(): number {
    return this.todos.length - this.completedCount()
  }

  private findTodo(id: number): Todo {
    return this.todos.find((todo) => todo.id === id)
  }
}
