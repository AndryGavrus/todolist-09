import type { TasksState } from '../app/App'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')

export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')

export const changeTaskTitleAC =
  createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

export const tasksReducer = createReducer(initialState, builder => (
  builder
    .addCase(deleteTaskAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({ title: action.payload.title, isDone: false, id: nanoid() })
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) tasks[index].isDone = action.payload.isDone
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) tasks[index].title = action.payload.title
    })
))

