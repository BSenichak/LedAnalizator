import { Container, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NotFound() {
    let { t } = useTranslation();
    let ps = useMediaQuery("(max-width: 600px)");
    let theme = useTheme()
    return (
        <Container sx={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexGrow: 1}}>
            <Number $ps={ps}>404</Number>
            <Text $ps={ps}>{t("notFound.text")}</Text>
            <A to={"/"} theme={theme}>{t("notFound.link")} →</A>
        </Container>
    );
}

let Number = styled.div`
    font-size: ${({ $ps }) => ($ps ? "12rem" : "20rem")};
    text-align: center;
    line-height: ${({ $ps }) => ($ps ? "12rem" : "20rem")};
`;
let Text = styled.div`
    font-size: ${({ $ps }) => ($ps ? "3rem" : "5rem")};
    text-align: center;
`;
let A = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1.5rem;
`
