import {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from "./Button.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


type PropsType = {
    todolistsId: string
    todoListTitle: string
    tasks: Array<TaskType>
    removeTask: (todolistsId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    addTask: (title: string, todolistsId: string) => void
    changeTaskStatus: (isDone: boolean, todolistsId: string, taskId: string) => void
    filter: FilterValuesType,
    deleteTodolist: (todolistsId: string) => void,
    changeTodolistTitle: (title: string, todolistsId: string) => void
    changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
}

export function TodolistItem(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.todolistsId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistsId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistsId);
    const deleteTodoListHandler = () => props.deleteTodolist(props.todolistsId)

    const createTaskHandler = (trimmedTitle: string) => {
        props.addTask(trimmedTitle, props.todolistsId)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistsId)
    }
    return <div>
        <h3>
            <EditableSpan title={props.todoListTitle}
                          onChangeTitle={changeTodolistTitleHandler}/>
            <button title={'x'} onClick={deleteTodoListHandler}>X</button>
        </h3>
        <AddItemForm onCreateItem={createTaskHandler}/>
        <ul>
            {
                props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(props.todolistsId, task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(e.currentTarget.checked, props.todolistsId, task.id);
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(newTitle, props.todolistsId, task.id)
                    }

                    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={task.isDone}/>
                        <EditableSpan title={task.title}
                                      onChangeTitle={changeTaskTitleHandler}/>
                        <Button title='x' onClick={onClickHandler}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button className={`buttonFilter ${props.filter === 'all' ? "active-filter" : ""}`}
                    onClick={onAllClickHandler} title='All'/>
            <Button className={`buttonFilter ${props.filter === 'active' ? "active-filter" : ""}`}
                    onClick={onActiveClickHandler} title='Active'/>
            <Button className={`buttonFilter ${props.filter === 'completed' ? "active-filter" : ""}`}
                    onClick={onCompletedClickHandler} title='Completed'/>
        </div>
    </div>
}

