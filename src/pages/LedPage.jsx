import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Backdrop,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOneLed } from "../store/apiReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChartNew from "../components/ChartNew";

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
            {data?.tensors && data.tensors.map((el, k) => (
                <Accordion key={k}
                    expanded={openTensor === k}
                    onChange={handleOpen(k)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {k}
                    </AccordionSummary>
                    <AccordionDetails>
                        {k == openTensor && <ChartNew tensorValues={el}/>}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>
        </Container>
    );
}
