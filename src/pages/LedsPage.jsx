import {
    Backdrop,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNames } from "../store/apiReducer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function LedsPage() {
    let [render, setRender] = useState(true);
    let dispatch = useDispatch();
    let leds = useSelector((state) => state.api.names).slice(1);
    let loading = useSelector((state) => state.api.loading);
    if (render) {
        dispatch(loadNames());
        setRender(false);
    }
    let theme = useTheme();
    let { t } = useTranslation();
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    padding: "2rem 0",
                }}
            >
                {t("led.allLeds.title")}
            </Typography>
            <LedsGrid>
                {leds.map((el) => (
                    <LedLink key={el.id} to={"/led?_id=" + el.id}>
                        <LedCard theme={theme}>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Img
                                    src={el?.img || "/images/led.svg"}
                                    alt="led img"
                                />
                                <br />
                                {el.name}
                                <CountBar>{el.tensorsCount >= 50 && <CheckCircleOutlineIcon sx={{color: theme.palette.success.main}}/>} {el.tensorsCount} / 50</CountBar>
                            </CardContent>
                        </LedCard>
                    </LedLink>
                ))}
                <Backdrop open={loading}><CircularProgress/></Backdrop>
            </LedsGrid>
        </Container>
    );
}

let LedLink = styled(Link)`
    text-decoration: none;
    `;

let LedsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1rem;
    `;

let Img = styled.img`
    height: 10rem;
    text-align: center;
    `;

let LedCard = styled(Card)`
    position: relative;
    &:hover {
        background-color: ${({ theme }) => theme.palette.text.disabled};
        transition: all 0.3s;
    }
    `;

let CountBar = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
`
