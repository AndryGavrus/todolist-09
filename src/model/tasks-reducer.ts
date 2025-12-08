import { create } from '@mui/material/styles/createTransitions'
import type { Task, TasksState } from '../app/App'
import type { CreateTodolistAction, DeleteTodolistAction } from './todolists-reducer'
import { createAction, nanoid } from '@reduxjs/toolkit'

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')

export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')

export const changeTaskTitleAC =
  createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case 'delete_task': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
      }
    }
    case 'create_task': {
      const newTask: Task = { title: action.payload.title, isDone: false, id: nanoid() }
      return { ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
    }
    case "change_task_status": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task)
      }
    }
    case "change_task_title": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task)
      }
    }
    case "create_todolist": {
      return { ...state, [action.payload.id]: [] }
    }
    case "delete_todolist": {
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    }
    default:
      return state
  }
}


export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction
  | CreateTodolistAction
  | DeleteTodolistAction
