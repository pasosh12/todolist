import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {useRef, useState} from "react";

type TodoListItemPropsType = {
    title: string,
    subTitle: string,
    description: string,
    tasks: TaskType[],
    deleteTask: (id: string) => void,
    addTask: (title: string) => void,
    changeToDoListFilter: (filter: FilterValuesType) => void
}

export const TodolistItem = ({
                                 title,
                                 subTitle,
                                 description,
                                 tasks,
                                 deleteTask,
                                 changeToDoListFilter,
                                 addTask
                             }: TodoListItemPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const createOnClickHandler = (filter: FilterValuesType) => () => (changeToDoListFilter(filter))
    const inputRef = useRef<HTMLInputElement>(null)


    return (
        <div>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <div>
                <input ref={inputRef}
                       value={taskTitle}
                       onChange={(e) => {
                           setTaskTitle(e.currentTarget.value)
                       }
                       }
                />
                <Button title={'+'}
                        onClickHandler={() => {
                            debugger;
                            addTask(taskTitle);
                            setTaskTitle('')
                        }}
                />
            </div>
            {
                tasks.length === 0 ? (
                    <p>No tasks</p>
                ) : (
                    <ul>
                        {tasks.map((item: TaskType) => {
                            const deleteTaskHandler = () => {
                                deleteTask(item.id)
                            }
                            return (
                                <li key={item.id}>
                                    <input type="checkbox" checked={item.isDone}/>
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