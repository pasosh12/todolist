import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType= "all" | "completed" | "active"

export function App() {
    const [tasks,setTasks] =  useState<TaskType[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false }
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const getFilteredTasks =
        (tasks:TaskType[], filterValue:FilterValuesType):Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t=> !t.isDone)
            case "completed":
                return tasks.filter(t=> t.isDone)
            default:
                return tasks
        }
    }
    const changeToDoListFilter=(filter:FilterValuesType)=>{
        setFilter(filter)
    }
    const deleteTask= (id:number)=>{
        const nextState:TaskType[] = tasks.filter(t=>t.id !== id)
        setTasks(nextState);
    }

const filteredTasks:TaskType[] = getFilteredTasks(tasks,filter)


  return (
      <div className="app">
        <TodolistItem
            title={'What to learn'}
            tasks={filteredTasks}
            subTitle={''}
            deleteTask={deleteTask}
            description={''}
            changeToDoListFilter={changeToDoListFilter}

        />

       </div>
  )
}


