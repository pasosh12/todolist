import {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../../../../model/tasks-reducer.ts";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {getListItemsSx} from "../../../../../../TodolistItem.styles.ts";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";
import {TaskType} from "../../../../../../app/App.tsx";

type Props = {
    task: TaskType
    todolistId: string
}
export const TaskItem = (props: Props) => {
    const id = props.todolistId
    const task = props.task
    const dispatch = useAppDispatch();
    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({
            todolistId: props.todolistId,
            taskId: task.id,
            newStatus: newStatusValue
        }))
    }
    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, newTitle}))
    }

    return (
        <ListItem sx={getListItemsSx(task.isDone)}
                  disablePadding={true}
                  key={task.id}>
            <Checkbox size={'medium'}
                      onChange={changeTaskStatus}
                      checked={task.isDone}/>
            <EditableSpan title={task.title}
                          onChangeTitle={changeTaskTitle}/>
            <IconButton onClick={deleteTask}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </ListItem>
    )
}


