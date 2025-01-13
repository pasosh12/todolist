import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodoListItemPropsType = {
    title: string,
    subTitle: string,
    description: string,
    tasks: TaskType[],
    addTask: (title: string) => void,
    deleteTask: (id: string) => void,
    changeToDoListFilter: (filter: FilterValuesType) => void,
    changeTaskStatus: (itemId: string, newStatusValue: boolean) => void,
    filter: string
}

export const TodolistItem = ({
                                 title,
                                 subTitle,
                                 description,
                                 tasks,
                                 addTask,
                                 deleteTask,
                                 changeToDoListFilter,
                                 changeTaskStatus,
                                 filter
                             }: TodoListItemPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const createOnClickHandler = (filter: FilterValuesType) => () =>
        (changeToDoListFilter(filter))

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            addTask(trimmedTitle);
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }
    const checkboxHandler = (e: ChangeEvent<HTMLInputElement>, itemId: string) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(itemId, newStatusValue)
    }
    const maxTitleLengthError:boolean = taskTitle.length > 15
    return (
        <div>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'}
                        onClickHandler={createTaskHandler}
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
                                           onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                               checkboxHandler(event, item.id)}/>
                                    <span>{item.title}</span>
                                    <Button title={'x'} onClickHandler={deleteTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button title={'All'} className={filter === 'all' ? 'active-filter' : ''}
                        onClickHandler={createOnClickHandler('all')}/>
                <Button title={'Active'} className={filter === 'active' ? 'active-filter' : ''}
                        onClickHandler={createOnClickHandler('active')}/>
                <Button title={'Completed'} className={filter === 'completed' ? 'active-filter' : ''}
                        onClickHandler={createOnClickHandler('completed')}/>

            </div>
        </div>
    )
}