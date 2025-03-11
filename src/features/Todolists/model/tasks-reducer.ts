import {TasksState} from '../../../app/App.tsx'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    newTitle: string
}>("tasks/changeTaskTitle");
export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    newStatus: boolean
}>("tasks/changeTaskStatus");
export const deleteTaskAC = createAction<{
    todolistId: string, taskId: string
}>('tasks/deleteTask')
export const createTaskAC = createAction('tasks/createTask', (title: string, todolistId: string) => {
    return {payload: {id: nanoid(), title, todolistId, isDone: false}}
})

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        }).addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
    })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task =>
                task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.newTitle
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task =>
                task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.newStatus
            }

        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift(action.payload)
        })
        .addCase(deleteTaskAC, (state, action) => {
            const taskIndex = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) {
                state[action.payload.todolistId].splice(taskIndex, 1);
            }
        })
})
