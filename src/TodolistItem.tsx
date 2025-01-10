import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {useRef,
    useState
} from "react";

type TodoListItemPropsType = {
    title: string,
    subTitle: string,
    description: string,
    tasks: TaskType[],
    deleteTask: (id: string) => void,
    addTask: (title: string) => void,
    changeToDoListFilter: (filter: FilterValuesType) => void
}
const [taskTitle, setTaskTitle] = useState<string>("")

export const TodolistItem = ({
                                 title,
                                 subTitle,
                                 description,
                                 tasks,
                                 deleteTask,
                                 changeToDoListFilter,
                                 // addTask
                             }: TodoListItemPropsType) => {

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
                       onChange={(e) =>{
                           debugger;
                    setTaskTitle(e.currentTarget.value)}
                    }
                />
                <Button title={'+'}
                //     //     onClick={() => {
                //     // if (inputRef.current) {
                //     //     // debugger;
                //     //     // console.log(inputRef.current)
                //     //     addTask(taskTitle);
                //     //     inputRef.current.value='';
                //     // }
                // {/*}*/}
                // {/*    }*/}
                />
            </div>
            {
                tasks.length === 0 ? (
                    <p>No tasks</p>
                ) : (
                    <ul>
                        {tasks.map((item: TaskType) => {
                            const deleteTaskHandler=()=>{
                                deleteTask(item.id)
                            }
                            return (
                                <li key={item.id}>
                                    <input type="checkbox" checked={item.isDone}/>
                                    <span>{item.title}</span>
                                    <Button title={'x'} onClick={deleteTaskHandler}/>
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