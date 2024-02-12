import { AppBar, Container, Toolbar, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function Footer() {
    let theme = useTheme();
    return (
        <AppBar position="static">
            <Container>
                <Wrapper theme={theme}>
                    <div>&copy; BSenychak {new Date().getFullYear()}</div>
                </Wrapper>
            </Container>
        </AppBar>
    );
}

let Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 5px 0;
`;
