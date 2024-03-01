import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MainPage() {
    let navigator = useNavigate();
    let {t} = useTranslation()
    return (
        <Container>
            <Wrapper>
                <CardWrapper>
                    <CardContent sx={{flexGrow: "1"}}>
                        <Typography variant="h5" textAlign={"center"}>
                            {t("main.scan.title")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => navigator("/analiz")}>
                            {t("main.scan.btn")}
                        </Button>
                    </CardActions>
                </CardWrapper>
                <CardWrapper>
                    <CardContent sx={{flexGrow: "1"}}>
                        <Typography variant="h5" textAlign={"center"}>
                            {t("main.add.title")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => navigator("/add")}>
                            {t("main.add.btn")}
                        </Button>
                    </CardActions>
                </CardWrapper>
                <CardWrapper>
                    <CardContent sx={{flexGrow: "1"}}>
                        <Typography variant="h5" textAlign={"center"}>
                            {t("main.about.title")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => navigator("/about")}>
                            {t("main.about.btn")}
                        </Button>
                    </CardActions>
                </CardWrapper>
                <CardWrapper>
                    <CardContent sx={{flexGrow: "1"}}>
                        <Typography variant="h5" textAlign={"center"}>
                            {t("main.about.leds")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => navigator("/leds")}>
                            {t("main.about.btn")}
                        </Button>
                    </CardActions>
                </CardWrapper>
            </Wrapper>
        </Container>
    );
}

let Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    justify-content: c;
    gap: 1rem;
    padding: 1rem 0;
`;

let CardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
`;
