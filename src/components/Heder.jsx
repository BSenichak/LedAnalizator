import {
    AppBar,
    Avatar,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useDispatch, useSelector } from "react-redux";
import { toggleLang, toggleTheme } from "../store/generalReducer";

export default function Heder() {
    let dispatch = useDispatch();
    let themeName = useSelector((s) => s.general.theme);
    let langName = useSelector((s) => s.general.lang);
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <LogoBar>
                        <Logo src="/images/logo.svg" alt="logo" />
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
`;

let LogoBar = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-grow: 1;
`;
