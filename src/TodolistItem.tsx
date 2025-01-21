import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodoListItemPropsType = {
    title: string,
    filter: string,
    tasks: TaskType[],
    addTask: (title: string) => void,
    deleteTask: (id: string) => void,
    changeToDoListFilter: (filter: FilterValuesType) => void,
    changeTaskStatus: (itemId: string,newStatus:boolean) => void,
}

export const TodolistItem = ({
                                 title,
                                 filter,
                                 tasks,
                                 addTask,
                                 deleteTask,
                                 changeToDoListFilter,
                                 changeTaskStatus,
                             }: TodoListItemPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const createOnClickHandler = (filter: FilterValuesType) => () =>
        (changeToDoListFilter(filter))

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            addTask(trimmedTitle);
        } else {
            setError('Title is required')
        }
            setTaskTitle('')
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTaskTitle(e.currentTarget.value)
    }
    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }
    // const checkboxHandler = (itemId: string) => {
    //     changeTaskStatus(itemId)
    // }
    const maxTitleLengthError:boolean = taskTitle.length > 15
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'}
                        onClick={createTaskHandler}
                        disabled={!taskTitle.length || maxTitleLengthError }
                />
                    {maxTitleLengthError && <div style={{color:'red'}}>Title is more 15 characters</div>}
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {
                tasks.length === 0 ? (
                    <p>No tasks</p>
                ) : (
                    <ul>
                        {tasks.map((item: TaskType) => {
                            const deleteTaskHandler = () => deleteTask(item.id)

                            return (
                                <li key={item.id} className={item.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" checked={item.isDone}
                                           onChange={(e) =>
                                               changeTaskStatus(item.id, e.currentTarget.checked)}/>
                                    <span>{item.title}</span>
                                    <Button title={'x'} onClick={deleteTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button title={'All'} className={filter === 'all' ? 'active-filter' : ''}
                        onClick={createOnClickHandler('all')}/>
                <Button title={'Active'} className={filter === 'active' ? 'active-filter' : ''}
                        onClick={createOnClickHandler('active')}/>
                <Button title={'Completed'} className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={createOnClickHandler('completed')}/>

            </div>
        </div>
    )
}