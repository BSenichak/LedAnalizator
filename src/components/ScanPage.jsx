import React from "react";
import WebCam from "./Webcam";
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openCamera, takeFoto } from "../store/cameraReducer";
import { useTranslation } from "react-i18next";
import { convertSpectrumToColors } from "../store/tfReducer";

export default function ScanPage() {
    let isCameraOpen = useSelector((s) => s.camera.cameraOpen);
    let image = useSelector((s) => s.camera.image);
    let d = useDispatch();
    const {t} = useTranslation()
    return (
        <Container sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem 0"}}>
            {isCameraOpen ? (
                <WebCam />
            ) : (
                <Button variant="contained" onClick={() => d(openCamera())}>
                    {t("scan.open")}
                </Button>
            )}
            {isCameraOpen && (
                <Button
                    variant="contained"
                    onClick={() => d(takeFoto())}
                    sx={{ alignSelf: "stretch" }}
                >
                    {t("scan.takephoto")}
                </Button>
            )}
            {image && <img src={image} alt="scan photo" />}
            {image && (
                <Button
                    variant="contained"
                    sx={{ alignSelf: "stretch" }}
                    onClick={()=>d(convertSpectrumToColors())}
                >
                    {t("scan.analiz")}
                </Button>
            )}
        </Container>
    );
}
