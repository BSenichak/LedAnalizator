import {
    AppBar,
    Avatar,
    Container,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useDispatch, useSelector } from "react-redux";
import { toggleLang, toggleTheme } from "../store/generalReducer";
import { Link } from "react-router-dom";

export default function Heder() {
    let dispatch = useDispatch();
    let themeName = useSelector((s) => s.general.theme);
    let langName = useSelector((s) => s.general.lang);
    let theme = useTheme()
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <LogoBar theme={theme} to="/">
                        <Logo src="/images/logo.svg" alt="logo" $t={theme.palette.mode == "dark"}/>
                        <Typography variant="h5">LEDAnalizator</Typography>
                    </LogoBar>
                    <IconButton onClick={() => dispatch(toggleTheme())}>
                        {themeName == "light" ? (
                            <WbSunnyIcon />
                        ) : (
                            <ModeNightIcon />
                        )}
                    </IconButton>
                    <IconButton onClick={()=>dispatch(toggleLang())}>
                        <Avatar src={`/images/${langName}.svg`} sx={{width: 24, height: 24}}/>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

let Logo = styled.img`
    height: 2rem;
    ${({$t})=>$t ? "filter: invert()": "filter: none"};
`;

let LogoBar = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-grow: 1;
    text-decoration: none;
    color: ${({theme})=>theme.palette.text.primary}
`;
