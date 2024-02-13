import React from "react";
import WebCam from "./Webcam";
import {
    Button,
    Container,
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openCamera, takeFoto, loadFoto } from "../store/cameraReducer";
import { useTranslation } from "react-i18next";
import { convertSpectrumToColors, setChanel } from "../store/tfReducer";
import Charts from "./Chart";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ScanPage() {
    let isCameraOpen = useSelector((s) => s.camera.cameraOpen);
    let image = useSelector((s) => s.camera.image);
    let values = useSelector((s) => s.tf.values);
    const chanel = useSelector((state) => state.tf.chanel);
    let d = useDispatch();
    const { t } = useTranslation();
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem 0",
            }}
        >
            <Typography variant="h3" textAlign={"center"}>
                {t("t.scan.pageTitle")}
            </Typography>
            {isCameraOpen && <WebCam />}
            {!isCameraOpen && (
                <TopBtns>
                    <Button variant="contained" onClick={() => d(openCamera())}>
                        {t("scan.open")}
                    </Button>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => d(loadFoto(e.target.files[0]))}
                        />
                    </Button>
                </TopBtns>
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
            {image && (
                <ResultWrapper>
                    <div>
                        <img src={image} alt="scan photo" />
                        <Button
                            variant="contained"
                            sx={{ alignSelf: "stretch" }}
                            onClick={() => d(convertSpectrumToColors())}
                        >
                            {t("scan.analiz")}
                        </Button>
                    </div>
                    <div>
                        <FormControl fullWidth sx={{ marginBottom: "0.5rem" }}>
                            <InputLabel id="demo-simple-select-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chanel}
                                label="Age"
                                onChange={(e) => {
                                    d(setChanel(e.target.value));
                                    d(convertSpectrumToColors())
                                }}
                            >
                                <MenuItem value={0}>Red</MenuItem>
                                <MenuItem value={1}>Green</MenuItem>
                                <MenuItem value={2}>Blue</MenuItem>
                            </Select>
                        </FormControl>
                        {values && <Charts tensorValues={values} />}
                    </div>
                </ResultWrapper>
            )}
        </Container>
    );
}

let ResultWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    & img {
        width: 100%;
    }
    & button {
        width: 100%;
        margin-top: 0.3rem;
    }
`;

let TopBtns = styled.div`
    display: flex;
    gap: 1rem;
    & button,
    label {
        flex-grow: 1;
    }
`;

const VisuallyHiddenInput = styledMUI("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
