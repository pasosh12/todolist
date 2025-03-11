import {AppBar, Box, Container, IconButton, Switch, Theme, Toolbar} from "@mui/material";
import {containerSx} from "./TodolistItem.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "./NavButton.ts";

type Props = {
    isDarkMode: boolean,
    setDarkMode: Function,
    theme: Theme,
}
export const Header = ({isDarkMode, setDarkMode, theme}: Props) => {

    return (
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
    );
};



