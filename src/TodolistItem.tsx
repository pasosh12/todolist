import {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, IconButton, Button, List, ListItem, Checkbox} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {containerSx, getListItemsSx} from "./TodolistItem.styles.ts";

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
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.todolistsId)
    }
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
            <IconButton onClick={deleteTodoListHandler}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </h3>
        <AddItemForm onCreateItem={createTaskHandler}
                     placeHolder={'Task title'}/>
        {props.tasks.length === 0 ? (
                <p>Empty List</p>
            ) :
            <List>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(props.todolistsId, task.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(e.currentTarget.checked, props.todolistsId, task.id);
                        }
                        const changeTaskTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(newTitle, props.todolistsId, task.id)
                        }

                        return (
                            <ListItem sx={getListItemsSx(task.isDone)}
                                      disablePadding={true}
                                      key={task.id}>
                                <Checkbox size={'medium'}
                                          onChange={onChangeHandler}
                                          checked={task.isDone}/>
                                <EditableSpan title={task.title}
                                              onChangeTitle={changeTaskTitleHandler}/>
                                <IconButton onClick={onClickHandler}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        }
        <Box sx={containerSx}>
            <Button variant={'contained'}
                    disableElevation
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('all')}>
                All
            </Button>
            <Button variant={'contained'}
                    disableElevation
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('active')}>
                Active
            </Button>
            <Button variant={'contained'}
                    disableElevation
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeFilterHandler('completed')}>
                Completed
            </Button>
        </Box>
    </div>
}

