import {TodolistType} from '@/app/App.tsx';
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {FilterButtons} from "./FilterButtons/FilterButtons.tsx";
import TodolistTitle from "./TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "./Tasks/Tasks.tsx";
import {createTaskAC} from "../../model/tasks-reducer.ts";
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type PropsType = {
    todolist:TodolistType
}

export function TodolistItem({todolist}: PropsType) {
    const dispatch = useAppDispatch();

    const createTask = (trimmedTitle: string) => {
        dispatch(createTaskAC(trimmedTitle, todolist.id))
    }

    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm onCreateItem={createTask}
                     placeHolder={'Task title'}/>
        <Tasks todolist={todolist}/>
        <FilterButtons todolist={todolist}/>
    </div>
}

