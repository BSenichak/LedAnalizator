import { Box, Container, useTheme } from "@mui/material";
import "./App.css";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "./components/Heder";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loadLang, loadTheme } from "./store/generalReducer";
import Footer from "./components/Footer";

import ScanPage from "./components/ScanPage";
import { loadTensorFlow } from "./store/tfReducer";

export default function App() {
    let { t } = useTranslation();
    let theme = useTheme();
    let dispatch = useDispatch();
    let [render, setRender] = useState(true);
    if (render) {
        dispatch(loadTheme());
        dispatch(loadLang());
        dispatch(loadTensorFlow())
        setRender(false);
    }
    return (
        <Wrapper theme={theme}>
            <Header />
            <main>
                <ScanPage />
            </main>
            <Footer />
        </Wrapper>
    );
}

let Wrapper = styled("div")`
    background-color: ${({ theme }) => theme.palette.background.default};
    min-height: 100vh;
    color: ${({ theme }) => theme.palette.text.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    display: flex;
    flex-direction: column;
    transition: background-color 0.3s;
    & main {
        flex-grow: 1;
    }
`;
