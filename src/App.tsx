import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from 'uuid'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active"

export function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const getFilteredTasks =
        (tasks: TaskType[], filterValue: FilterValuesType): Array<TaskType> => {
            switch (filterValue) {
                case "active":
                    return tasks.filter(t => !t.isDone)
                case "completed":
                    return tasks.filter(t => t.isDone)
                default:
                    return tasks
            }
        }
    const changeToDoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const onAddTask = (title: string) => {

        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const onDeleteTask = (id: string) => {
        const nextState: TaskType[] = tasks.filter(t => t.id !== id)
        setTasks(nextState);
    }
    const changeTaskStatus = (taskId: string, newStatusValue: boolean) => {
        const newState = tasks.map(
            task => task.id == taskId ?
                {...task, isDone: newStatusValue} : task
        )

        setTasks(newState)
    }
    /// через find
    //     const taskToUpdate = tasks.find(task => task.id === taskId)
    //     if (taskToUpdate) {
    //         taskToUpdate.isDone = newStatusValue;
    //         setTasks([...tasks])
    //     }
    // }

    const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)


    return (
        <div className="app">
            <TodolistItem
                title={'What to learn'}
                tasks={filteredTasks}
                subTitle={''}
                deleteTask={onDeleteTask}
                description={''}
                changeToDoListFilter={changeToDoListFilter}
                addTask={onAddTask}
                changeTaskStatus={changeTaskStatus}

            />

        </div>
    )
}


