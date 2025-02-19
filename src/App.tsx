import {useReducer, useState} from 'react';
import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm.tsx";
import { Box, Paper, Grid2 } from '@mui/material'
import {
    createTodolistAC,
    deleteTodolistAC,
    editTodolistFilterAC,
    editTodolistTitleAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
export type TasksState = {
    [todolistID: string]: TaskType[]
}


function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksState>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
        ]
    });

//tasks
    //C
    function addTask(title: string, todolistsId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistsId]: [newTask, ...tasks[todolistsId]]};
        setTasks(newTasks);
    }

    //U
    function changeTaskStatus(isDone: boolean, todolistsId: string, taskId: string) {
        setTasks({...tasks, [todolistsId]: tasks[todolistsId].map(t => t.id === taskId ? {...t, isDone} : t)});

    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        const newState: TasksState = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task)
        }
        setTasks(newState)
    }

    //D
    function removeTask(todolistsId: string, id: string) {
        let filteredTasks = tasks[todolistsId].filter(t => t.id !== id);
        const nextState: TasksState = {...tasks, [todolistsId]: filteredTasks}
        setTasks(nextState);
    }

    // todoLists
    // C
    const createTodolist = (title: string) => {
        // const newTodolistId = v1()
        // const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        // const nextState: TodolistType[] = [ newTodolist, ...todolists,]
        // setTodolists(nextState)
        const action=createTodolistAC(title)
        dispatchToTodolistsReducer(action)
        // dispatchToTaskreducer(action)
        const nextTasksState: TasksState = {...tasks, [action.payload.id]: []}
        setTasks(nextTasksState)
    }

    // U/
    const changeTodolistFilter = (value: FilterValuesType, todolistsId: string) => {
        // const nextState: TodolistType[] = todolists.map(t => t.id === todolistsId ? {...t, filter: value} : t)
        // setTodolists(nextState)
        dispatchToTodolistsReducer(editTodolistFilterAC(todolistsId, value))
    }
    const changeTodolistTitle = (title: string, todolistsId: string) => {
        // const nextState: TodolistType[] = todolists.map(t => t.id === todolistsId ? {...t, title} : t)
        // setTodolists(nextState)
        dispatchToTodolistsReducer(editTodolistTitleAC(todolistsId,title))
    }

    // D
    const deleteTodolist = (todolistsId: string) => {
        // const nextState: TodolistType[] = todolists.filter(tl => tl.id !== todolistsId)
        // setTodolists(nextState)
        // const action=deleteTodolistAC(todolistsId)
        // dispatchToTodolistsReducer(action)
        // dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(deleteTodolistAC(todolistsId))
        // dispatchToTaskreducer(action)
        delete tasks[todolistsId]
        // delete tasks[action.payload.id]
    }


    let todolistsItems = todolists.map(tl => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
            }
            if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
            }
            return (
                <Paper style={{padding: "10px"}}>
                    <TodolistItem
                        key={tl.id}
                        todolistsId={tl.id}
                        todoListTitle={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        deleteTodolist={deleteTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            )
        }
    )

    return (
        <div className="App">
            <Box sx={{flexGrow: 1, padding: '20px'}}>
                <Grid2 container spacing={2}>
                    <Grid2>
                        {/*xs={12} sm={4}>*/}
                        <Paper elevation={3} style={{padding: "10px"}}>
                            <h3>Add new To_do_list</h3>
                            <AddItemForm onCreateItem={createTodolist} placeHolder={'Todo title'}/>
                        </Paper>
                    </Grid2>
                    <Grid2>
                        {/*// xs={12} sm={8}*/}
                        <Grid2 container spacing={2}>
                            {todolistsItems.map((item, index) => (
                                <Grid2 key={index}>
                                    <Paper elevation={3} style={{padding: "10px", minHeight:'290px'}}>
                                        {item}
                                    </Paper>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
        </div>
    );
}

export default App;
