import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent,KeyboardEvent, useState} from "react";

type TodoListItemPropsType = {
    title: string,
    subTitle: string,
    description: string,
    tasks: TaskType[],
    deleteTask: (id: string) => void,
    addTask: (title: string) => void,
    changeToDoListFilter: (filter: FilterValuesType) => void,
    changeTaskStatus :(itemId:string,newStatusValue:boolean)=>void
}

export const TodolistItem = ({
                                 title,
                                 subTitle,
                                 description,
                                 tasks,
                                 deleteTask,
                                 changeToDoListFilter,
                                 addTask,
                                 changeTaskStatus
                             }: TodoListItemPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('')

    const createOnClickHandler = (filter: FilterValuesType) => () =>
        (changeToDoListFilter(filter))

    const createTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }
const checkboxHandler= (e: React.ChangeEvent<HTMLInputElement>, itemId: string)=>{
    const newStatusValue= e.currentTarget.checked
    changeTaskStatus(itemId,newStatusValue)
}

    return (
        <div>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title={'+'}
                        onClickHandler={createTaskHandler}
                />
            </div>
            {
                tasks.length === 0 ? (
                    <p>No tasks</p>
                ) : (
                    <ul>
                        {tasks.map((item: TaskType) => {
                            const deleteTaskHandler = () => deleteTask(item.id)

                            return (
                                <li key={item.id}>
                                    <input type="checkbox" checked={item.isDone}
                                           onChange={(event:ChangeEvent<HTMLInputElement>)=>
                                               checkboxHandler(event,item.id)}/>
                                    <span>{item.title}</span>
                                    <Button title={'x'} onClickHandler={deleteTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button title={'All'} onClickHandler={createOnClickHandler('all')}/>
                <Button title={'Active'} onClickHandler={createOnClickHandler('active')}/>
                <Button title={'Completed'} onClickHandler={createOnClickHandler('completed')}/>

            </div>
        </div>
    )
}