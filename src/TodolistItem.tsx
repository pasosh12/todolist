import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";

type TodoListItemPropsType = {
    title: string,
    subTitle: string,
    description: string,
    tasks: TaskType[],
    deleteTask: (id: number) => void,
    changeToDoListFilter: (filter: FilterValuesType) => void
}

export const TodolistItem = ({
                                 title,
                                 subTitle,
                                 description,
                                 tasks,
                                 deleteTask,
                                 changeToDoListFilter
                             }: TodoListItemPropsType) => {

    const createOnClickHandler=(filter:FilterValuesType) => ()=>(changeToDoListFilter(filter))
    return (
        <div>
            <h3>{title}</h3>
            <h4>{subTitle}</h4>
            <p>{description}</p>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {
                tasks.length === 0 ? (
                    <p>No tasks</p>
                ) : (
                    <ul>
                        {tasks.map((item: TaskType) => {
                            return (
                                <li key={item.id}>
                                    <input type="checkbox" checked={item.isDone}/>
                                    <span>{item.title}</span>
                                    <Button title={'x'} onClickHandler={() => deleteTask(item.id)}/>
                                </li>
                            )
                        })}
                    </ul>
                )
            }

            <div>
                <Button title={'All'} onClickHandler={createOnClickHandler('all')}/>
                <Button title={'Active'} onClickHandler={createOnClickHandler('active')}/>
                <Button title={'Completed'} onClickHandler={ createOnClickHandler('completed')}/>

            </div>
        </div>
    )
}