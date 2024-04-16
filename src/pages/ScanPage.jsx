import React, { useEffect } from "react";
import WebCam from "../components/Webcam";
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openCamera, takeFoto, loadFoto } from "../store/cameraReducer";
import { useTranslation } from "react-i18next";
import { convertSpectrumToColors } from "../store/tfReducer";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChartNew from "../components/ChartNew";
import { clearPredicted, makePredict } from "../store/apiReducer";
import Camera from "../components/Camera";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
    let isPhone = useMediaQuery("(max-width: 600px)");
    let isCameraOpen = useSelector((s) => s.camera.cameraOpen);
    let image = useSelector((s) => s.camera.image);
    let values = useSelector((s) => s.tf.values);
    let tfloading = useSelector((s) => s.tf.loading);
    let cameralLoading = useSelector((s) => s.camera.loading);
    let apiLoading = useSelector((s) => s.api.loading);
    let d = useDispatch();
    const { t } = useTranslation();
    let navigator = useNavigate();
    let predicted = useSelector((s) => s.api.predicted);
    useEffect(() => {
        if (predicted) {
            d(clearPredicted())
            navigator("/led?_id=" + predicted._id);
        }
    }, [predicted]);

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem 0",
            }}
        >
            <Typography
                variant="h3"
                textAlign={"center"}
                sx={{ padding: "1rem 0" }}
            >
                {t("t.scan.pageTitle")}
            </Typography>
            <TopBtns $ps={isPhone}>
                <Button variant="contained" onClick={() => d(openCamera())}>
                    {t("scan.open")}
                </Button>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    {t("scan.uploadFoto")}
                    <VisuallyHiddenInput
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => d(loadFoto(e.target.files[0]))}
                    />
                </Button>
            </TopBtns>
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
                <ResultWrapper $ps={isPhone}>
                    <Card>
                        <img src={image} alt="scan photo" />
                    </Card>
                    <Card>
                        <CardContent>
                            {!values && (
                                <Button
                                    variant="contained"
                                    sx={{ alignSelf: "stretch" }}
                                    onClick={() => d(convertSpectrumToColors())}
                                >
                                    {t("scan.analiz")}
                                </Button>
                            )}
                            {values && (
                                <>
                                    <ChartNew tensorValues={values} />
                                    <Button
                                        variant="contained"
                                        sx={{ alignSelf: "stretch" }}
                                        onClick={() => d(makePredict())}
                                    >
                                        {t("scan.sendToAI")}
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </ResultWrapper>
            )}
            <Camera open={isCameraOpen} />
            <Backdrop open={tfloading || cameralLoading || apiLoading}>
                <CircularProgress />
            </Backdrop>
        </Container>
    );
}

let ResultWrapper = styled.div`
    display: grid;
    grid-template-columns: ${({ $ps }) => ($ps ? "1fr" : "1fr 1fr")};
    gap: 1rem;
    padding: ${({ $ps }) => ($ps ? "1rem" : "0")};
    & img {
        width: 100%;
    }
    & button {
        width: 100%;
        margin-top: 0.3rem;
    }
`;

let TopBtns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: ${({ $ps }) => ($ps ? "1rem" : "0")};
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
