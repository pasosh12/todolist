import {AppBar, Box, Container, IconButton, Switch, Theme, Toolbar} from "@mui/material";
import {containerSx} from "@/TodolistItem.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "../NavButton/NavButton.ts";
import {ThemeMode} from "@/app/app-reducer.ts";

type Props = {
    theme: Theme
    changeThemeMode: () => void,
    themeMode: ThemeMode,
}
export const Header = ({
                           theme, changeThemeMode, themeMode
                       }: Props) => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg" sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={containerSx}>
                        <Switch checked={themeMode === 'dark'}
                                onChange={changeThemeMode}
                        />
                        <NavButton color="inherit">Sign in</NavButton>
                        <NavButton color="inherit">Sign up</NavButton>
                        <NavButton
                            background={theme.palette.primary.dark}
                            color="inherit">Faq</NavButton>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};



