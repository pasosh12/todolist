import {useReducer, useState} from 'react';
import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm.tsx";
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {deepOrange, deepPurple} from "@mui/material/colors";
import {
    createTodolistAC,
    deleteTodolistAC,
    editTodolistFilterAC,
    editTodolistTitleAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {createTaskAC, deleteTaskAC, editTaskStatusAC, editTaskTitleAC, tasksReducer} from "./model/tasks-reducer.ts";
import {
    AppBar,
    Box,
    Container,
    Grid2,
    IconButton,
    Paper, Switch,
    Toolbar,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from "@mui/material";

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


export const App = () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
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
        dispatchToTaskReducer(createTaskAC(title, todolistsId))
    }

    //U
    function changeTaskStatus(isDone: boolean, todolistsId: string, taskId: string) {
        dispatchToTaskReducer(editTaskStatusAC(todolistsId, taskId, isDone))
    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatchToTaskReducer(editTaskTitleAC(todolistId, taskId, title))
    }

    //D
    function removeTask(todolistsId: string, id: string) {
        dispatchToTaskReducer(deleteTaskAC(todolistsId, id))
    }

    // todoLists
    // C
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTaskReducer(action)
    }

    // U/
    const changeTodolistFilter = (value: FilterValuesType, todolistsId: string) => {
        dispatchToTodolistsReducer(editTodolistFilterAC(todolistsId, value))
    }
    const changeTodolistTitle = (title: string, todolistsId: string) => {
        dispatchToTodolistsReducer(editTodolistTitleAC(todolistsId, title))
    }

    // D
    const deleteTodolist = (todolistsId: string) => {
        const action = deleteTodolistAC(todolistsId)
        dispatchToTodolistsReducer(action)
        dispatchToTaskReducer(action)
    }


    const todolistsItems = (todolists || []).map(tl => {
            let tasksForTodolist = tasks[tl.id];
            if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
            }
            if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
            }
            return (
                <Grid2 spacing={3} key={tl.id}>
                    <Paper elevation={8} sx={{p: '15px'}} square={true}>
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
                </Grid2>
            )
        }
    )
    const [isDarkMode, setDarkMode] = useState(false)
    const theme = createTheme({
        palette: {
            // primary: {
            //     main:'#ef6c00'
            // },
            primary: deepOrange,//indigo
            secondary: deepPurple,
            mode: isDarkMode ? "dark" : "light"

        }
    })
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth="lg" sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box sx={containerSx}>
                                <Switch checked={isDarkMode} onChange={() => setDarkMode(!isDarkMode)}/>
                                <NavButton color="inherit">Sign in</NavButton>
                                <NavButton color="inherit">Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark} color="inherit">Faq</NavButton>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid2 container sx={{p: '15px 0'}}>
                        <AddItemForm placeHolder={'New Todolist Title'} onCreateItem={createTodolist}/>
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {todolistsItems}
                    </Grid2>
                </Container>
            </ThemeProvider>
        </div>
    );
}


