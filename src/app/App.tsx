import {useState} from 'react';
import './App.css';
import {deepOrange, deepPurple} from "@mui/material/colors";
import {createTheme, CssBaseline, ThemeProvider,} from "@mui/material";
import {Header} from "../common/components/Header/Header.tsx";
import {Menu} from "./Menu.tsx";

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
                <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} theme={theme}/>
                <Menu/>
            </ThemeProvider>
        </div>
    );
}


