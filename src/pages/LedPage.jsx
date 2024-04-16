import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Backdrop,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Fab,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOneLed } from "../store/apiReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChartNew from "../components/ChartNew";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import EditLedData from "../components/EditLedData";

export default function LedPage() {
    let _id = new URLSearchParams(location.search).get("_id");
    let [render, setRender] = useState(true);
    let dispatch = useDispatch();
    let loading = useSelector((state) => state.api.loading);
    let data = useSelector((state) => state.api.ledData);
    if (render) {
        dispatch(loadOneLed(_id));
        setRender(false);
    }
    let [openTensor, setOpenTensor] = useState(false);
    const handleOpen = (panel) => (event, isExpanded) => {
        setOpenTensor(isExpanded ? panel : false);
    };
    let {t} = useTranslation()
    const [openEdit, setOpenEdit] = useState(false)
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    padding: "1rem 0",
                }}
            >
                {data.name}
            </Typography>
            <DataSection>
                <CardContent>
                    <LedImage src={data?.img ||"/images/led.svg"} alt="led img" />
                    {data?.description ? data?.description : t("led.noDescription")}
                </CardContent>
            </DataSection>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {t("led.tensors")}
                </AccordionSummary>
                <AccordionDetails>
                    <AccordionTensors>
                        {data?.tensors &&
                            data.tensors.map((el, k) => (
                                <Accordion
                                    key={k}
                                    expanded={openTensor === k}
                                    onChange={handleOpen(k)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        {k + 1}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {k == openTensor && (
                                            <ChartNew tensorValues={el} />
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                    </AccordionTensors>
                </AccordionDetails>
            </Accordion>
            {openEdit && <EditLedData open={openEdit} setOpen={setOpenEdit} data={data}/>}
            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>

            <Fab variant="circular" color="primary" sx={{ position: "fixed", bottom: 16, right: 16 }} onClick={() => setOpenEdit(true)}>
                    <EditIcon />
            </Fab>
        </Container>
    );
}

let AccordionTensors = styled.div`
    
`;

let DataSection = styled(Card)`
    margin-bottom: 1rem;
`

let LedImage = styled.img`
    height: 10rem;
    float: left;
    margin-right: 1rem;
    margin-bottom: 1rem;
`
