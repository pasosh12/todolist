import {createTaskAC, editTaskStatusAC, editTaskTitleAC, tasksReducer} from "./tasks-reducer.ts";
import type {TasksState} from "../App.tsx";
import {test, expect, beforeEach} from 'vitest'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";


let startState: TasksState = {};

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})


test('correct todoList should be created', () => {

    const endState: TasksState = tasksReducer(startState, createTodolistAC('newTodolist'))
    const keys=Object.keys(endState)
    const newKey = keys.find(k=>k!=='todolistId1' && k!=='todolistId2')
    if(!newKey){
        throw Error("New key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    // expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be created and added to start', () => {

    const endState: TasksState = tasksReducer(startState, createTaskAC('buy coffee', 'todolistId2' ))

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('buy coffee') //added to start

})

test('correct task should update its title', () => {
    let todolistid = 'todolistId2'
    let taskId='1'
    let newTitle = 'changed title'
    const endState: TasksState = tasksReducer(startState,editTaskTitleAC(todolistid, taskId, newTitle))
    const taskToChange = endState[todolistid].find(t=>t.id ==taskId)
    if(!taskToChange){
        throw Error("Not found such a task")
    }
    expect(taskToChange.title).toEqual(newTitle)
})

test('correct task should update its status', () => {
    let todolistid = 'todolistId2'
    let taskId='1'
    let newStatus = startState[todolistid].find(t => t.id === taskId)?.isDone;
    newStatus = newStatus !== undefined ? !newStatus : (() => { throw new Error("Task not found") })();

    const endState: TasksState = tasksReducer(startState,editTaskStatusAC(todolistid, taskId, newStatus))

    const taskToChange = endState[todolistid].find(t=>t.id ==taskId)
    if(!taskToChange){
        throw Error("Not found such a task")
    }
    expect(taskToChange.isDone).toEqual(newStatus)
})
