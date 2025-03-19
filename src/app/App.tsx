import './App.css';
import {CssBaseline, ThemeProvider,} from "@mui/material";
import {Header} from "../common/components/Header/Header.tsx";
import {Menu} from "./Menu.tsx";
import {selectThemeMode} from "@/app/app-selector.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {getTheme} from "@/common/theme/theme.ts";

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
    const themeMode = useAppSelector(selectThemeMode);
    const theme = getTheme(themeMode);

    const changeThemeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header
                    theme={theme}
                    changeThemeMode={changeThemeMode}
                    themeMode={themeMode}/>
                <Menu/>
            </ThemeProvider>
        </div>
    );
}


