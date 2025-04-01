import {TasksState, TaskType} from '@/app/App.tsx'
import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

// export const changeTaskTitleAC = createAction<{
//     todolistId: string,
//     taskId: string,
//     newTitle: string
// }>("tasks/changeTaskTitle");
// export const changeTaskStatusAC = createAction<{
//     todolistId: string,
//     taskId: string,
//     newStatus: boolean
// }>("tasks/changeTaskStatus");
// export const deleteTaskAC = createAction<{
//     todolistId: string, taskId: string
// }>('tasks/deleteTask')
// export const createTaskAC = createAction('tasks/createTask', (title: string, todolistId: string) => {
//     return {payload: {id: nanoid(), title, todolistId, isDone: false}}
// })

// export const tasksReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(deleteTodolistAC, (state, action) => {
//             delete state[action.payload.todolistId]
//         }).addCase(createTodolistAC, (state, action) => {
//         state[action.payload.id] = []
//     })
//         .addCase(changeTaskTitleAC, (state, action) => {
//             const task = state[action.payload.todolistId].find(task =>
//                 task.id === action.payload.taskId)
//             if (task) {
//                 task.title = action.payload.newTitle
//             }
//         })
//         .addCase(changeTaskStatusAC, (state, action) => {
//             const task = state[action.payload.todolistId].find(task =>
//                 task.id === action.payload.taskId)
//             if (task) {
//                 task.isDone = action.payload.newStatus
//             }
//
//         })
//         .addCase(createTaskAC, (state, action) => {
//             state[action.payload.todolistId].unshift(action.payload)
//         })
//         .addCase(deleteTaskAC, (state, action) => {
//             const taskIndex = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
//             if (taskIndex !== -1) {
//                 state[action.payload.todolistId].splice(taskIndex, 1);
//             }
//         })
// })
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: (create) => {
        return {
            changeTaskStatusAC: create.reducer<{
                todolistId: string,
                taskId: string,
                newStatus: boolean
            }>((state, action) => {
                const task = state[action.payload.todolistId].find(task =>
                    task.id === action.payload.taskId)
                if (task) {
                    task.isDone = action.payload.newStatus
                }
            }),
            changeTaskTitleAC: create.reducer<{
                todolistId: string,
                taskId: string,
                newTitle: string
            }>((state, action) => {
                const task = state[action.payload.todolistId].find(task =>
                    task.id === action.payload.taskId)
                if (task) {
                    task.title = action.payload.newTitle
                }
            }),

            deleteTaskAC: create.reducer<{ todolistId: string, taskId:string }>((state, action) => {
                const taskIndex = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (taskIndex !== -1) {
                state[action.payload.todolistId].splice(taskIndex, 1);
            }
            }),

            createTaskAC: create.preparedReducer((title: string, todolistId: string,) => ({

                payload: {
                    todolistId,
                    id: nanoid(),
                    title
                }
            }), (state, action) => {

                if (!state[action.payload.todolistId]) {
                    state[action.payload.todolistId] = []
                }
                const newTask: TaskType = {id: action.payload.id, title: action.payload.title, isDone: false}
                state[action.payload.todolistId].unshift(newTask)
            })
        }
    }
})
export const tasksReducer = tasksSlice.reducer
export const {deleteTaskAC, changeTaskTitleAC, changeTaskStatusAC, createTaskAC} = tasksSlice.actions;
