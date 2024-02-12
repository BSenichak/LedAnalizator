import React from "react";
import WebCam from "./Webcam";
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openCamera, takeFoto } from "../store/cameraReducer";

export default function ScanPage() {
    let isCameraOpen = useSelector((s) => s.camera.cameraOpen);
    let image = useSelector((s) => s.camera.image);
    let d = useDispatch();
    return (
        <Container sx={{display: "flex", flexDirection:"column"}}>
            {isCameraOpen ? (
                <WebCam />
            ) : (
                <Button variant="contained" onClick={() => d(openCamera())}>
                    scan photo
                </Button>
            )}
            {isCameraOpen && (
                <Button variant="contained" onClick={() => d(takeFoto())} sx={{alignSelf: 'stretch'}}>
                    take photo
                </Button>
            )}
            <img src={image} alt="" />
        </Container>
    );
}
