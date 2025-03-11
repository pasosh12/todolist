import {List} from "@mui/material";
import {TodolistType} from "./app/App.tsx";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectTasks} from "./model/tasks-selectors.ts";
import {TaskItem} from "./TaskItem.tsx";

type Props = {
    todolist: TodolistType
}
export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks);

    const todolistTasks = tasks[id];
    let filteredTasks = todolistTasks
    if (filter === "active") {
        filteredTasks = todolistTasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        filteredTasks = todolistTasks.filter(t => t.isDone);
    }
    return (
        <>
            {filteredTasks.length === 0 ? (
                    <p>Empty List</p>
                ) :
                <List>
                    {filteredTasks.map(task => {
                            return (
                                <TaskItem task={task} todolistId={id} key={task.id}/>
                            )
                        })
                    }
                </List>
            }
        </>
    );
};
