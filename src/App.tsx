import {useState} from 'react';
import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {AddItemForm} from "./AddItemForm.tsx";
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {deepOrange, deepPurple} from "@mui/material/colors";
import {
    createTodolistAC,
    deleteTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,

} from "./model/todolists-reducer.ts";
import {createTaskAC, deleteTaskAC,  changeTaskTitleAC, changeTaskStatusAC,} from "./model/tasks-reducer.ts";
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
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {selectTodolists} from "./model/todolists-selectors.ts";
import {selectTasks} from "./model/tasks-selectors.ts";

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

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)


//tasks
    //C
    function addTask(title: string, todolistId: string) {
        dispatch(createTaskAC(title, todolistId))
    }

    //U
    function changeTaskStatus(newStatus: boolean, todolistId: string, taskId: string) {
        dispatch(changeTaskStatusAC({todolistId, taskId, newStatus}))
    }

    const changeTaskTitle = (newTitle: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, newTitle}))
    }

    //D
    function deleteTask(todolistId: string, taskId: string) {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    // todoLists
    // C
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    // U/
    const changeTodolistFilter = (newFilter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({todolistId, newFilter}))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC({todolistId, newTitle}))
    }

    // D
    const deleteTodolist = (todolistsId: string) => {
        const action = deleteTodolistAC({id:todolistsId})
        dispatch(action)
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
                            removeTask={deleteTask}
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


