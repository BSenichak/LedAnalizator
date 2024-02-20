import React from "react";
import WebCam from "../components/Webcam";
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    TextField,
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
import { addNewLed, loadNames, makePredict, setNewName } from "../store/apiReducer";
import Camera from "../components/Camera";
import NamesAutocomplite from "../components/NamesAutocomplite";

export default function AddPage() {
    let isPhone = useMediaQuery("(max-width: 600px)");
    let isCameraOpen = useSelector((s) => s.camera.cameraOpen);
    let image = useSelector((s) => s.camera.image);
    let values = useSelector((s) => s.tf.values);
    let tfloading = useSelector((s) => s.tf.loading);
    let cameralLoading = useSelector((s) => s.camera.loading);
    let apiLoading = useSelector((s) => s.api.loading);
    let isNew = useSelector((s) => s.api.choose?._id == "0");
    let newName = useSelector((s) => s.api.newName);
    let d = useDispatch();
    const { t } = useTranslation();
    // d(loadNames())
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
                {t("t.add.pageTitle")}
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
                                <div style={{display: "flex", flexDirection: 'column', gap: "1rem", alignItems: "stretch"}}>
                                    <ChartNew tensorValues={values} />
                                    <NamesAutocomplite />
                                    {isNew && 
                                        <TextField label={"new Name"} value={newName} onChange={(e)=>d(setNewName(e.target.value))}/>
                                    }
                                    {isNew && 
                                        <Button onClick={()=>d(addNewLed())} variant="contained" disabled={newName.length < 3}>Add new</Button>
                                    }
                                </div>
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
