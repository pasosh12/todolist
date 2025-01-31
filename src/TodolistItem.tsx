import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Button.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistsId:string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsId:string, taskId: string) => void
    changeFilter: (value: FilterValuesType, id:string) => void
    addTask: (todolistsId:string, title: string) => void
    changeTaskStatus: (todolistsId:string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType,
    deleteTodolist:(todolistsId: string)=>void
}

export function TodolistItem(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistsId,title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all",props.todolistsId);
    const onActiveClickHandler = () => props.changeFilter("active",props.todolistsId);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.todolistsId);
    const deleteTodoListHandler=()=>props.deleteTodolist(props.todolistsId)

    return <div>
        <h3>{props.title}
            <button title={'x'} onClick={deleteTodoListHandler}>X</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistsId,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistsId,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title='x' onClick={onClickHandler}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button className={`buttonFilter ${props.filter === 'all' ? "active-filter" : ""}`}
                    onClick={onAllClickHandler} title = 'All'/>
            <Button className={`buttonFilter ${props.filter === 'active' ? "active-filter" : ""}`}
                    onClick={onActiveClickHandler} title = 'Active' />
            <Button className={`buttonFilter ${props.filter === 'completed' ? "active-filter" : ""}`}
                    onClick={onCompletedClickHandler} title = 'Completed'/>
        </div>
    </div>
}
