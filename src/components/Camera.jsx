import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    IconButton,
} from "@mui/material";
import React from "react";
import WebCam from "../components/Webcam";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { closeCamera, takeFoto } from "../store/cameraReducer";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { clearValues } from "../store/tfReducer";

export default function Camera({ open }) {
    let { t } = useTranslation();
    let dispatch = useDispatch();
    return (
        <Dialog open={open} fullWidth="xs">
            <DialogTitle sx={{ m: 0, p: 2 }}>{t("scan.open")}</DialogTitle>
            <IconButton
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                onClick={() => dispatch(closeCamera())}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ padding: "5px", position: "relative" }}>
                <Line />
                <WebCam />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={() => {
                        dispatch(takeFoto());
                        dispatch(clearValues())
                    }}
                >
                    {t("scan.takephoto")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

let Line = styled.div`
    position: absolute;
    width: 98%;
    top: 50%;
    border-bottom: 2px solid red;
`;
