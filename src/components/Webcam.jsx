import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { setCamera } from "../store/cameraReducer";
import styled from "styled-components";
import { Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function WebCam() {
    const [width, setWidth] = useState(0);
    const {t} = useTranslation()

    useEffect(() => {
        const handleResize = () => {
            setWidth(wrapperRef.current.offsetWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const [camEroor, setCamEroor] = useState(false);

    const webcamRef = React.useRef(null);
    const wrapperRef = React.useRef(null);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCamera(webcamRef.current));
    }, [webcamRef]);
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(
        (mediaDevices) =>
            setDevices(
                mediaDevices.filter(({ kind }) => kind === "videoinput")
            ),
        [setDevices]
    );

    React.useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            // Ensure API is supported and in a secure context (HTTPS)
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
          } else {
            console.warn('navigator.mediaDevices.enumerateDevices not supported');
            setCamEroor(true);
          }
    }, [handleDevices]);
    return (
        <Wrapper ref={wrapperRef}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={width}
                videoConstraints={{
                    facingMode: "environment",
                }}
            />
            <Snackbar open={camEroor} autoHideDuration={6000} onClose={()=>setCamEroor(false)}>
                <Alert severity="error">
                    {t("main.scan.camError")}
                </Alert>
            </Snackbar>
        </Wrapper>
    );
}

let Wrapper = styled.div``;
