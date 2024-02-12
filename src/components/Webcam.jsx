import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { setCamera } from "../store/cameraReducer";
import styled from "styled-components";

export default function WebCam() {
    const [width, setWidth] = useState(0);

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
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
        console.log(devices, deviceId);
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
        </Wrapper>
    );
}

let Wrapper = styled.div``;
