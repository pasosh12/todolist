import {TodolistType} from './App';
import {AddItemForm} from "./AddItemForm.tsx";
import {FilterButtons} from "./features/Tasks/FilterButtons.tsx";
import TodolistTitle from "./TodolistTitle.tsx";
import {Tasks} from "./Tasks.tsx";
import {createTaskAC} from "./model/tasks-reducer.ts";
import {useAppDispatch} from './common/hooks/useAppDispatch.ts';

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

