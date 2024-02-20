import React, { useEffect, useState } from "react";
import {
    Alert,
    Backdrop,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Modal,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    openCamera,
    takeFoto,
    loadFoto,
    cameraClear,
} from "../store/cameraReducer";
import { useTranslation } from "react-i18next";
import { clearValues, convertSpectrumToColors } from "../store/tfReducer";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChartNew from "../components/ChartNew";
import {
    addNewLed,
    addNewTensor,
    apiClear,
    setNewName,
} from "../store/apiReducer";
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
    let led = useSelector((state) => state.api.choose);
    let isdone = useSelector((state) => state.api.done);
    let d = useDispatch();
    const { t } = useTranslation();
    let [modal, setModal] = useState(false);
    let [modalNew, setModalNew] = useState(false);
    let [success, setSuccess] = useState(false);
    useEffect(() => {
        if (isdone) {
            d(clearValues());
            d(cameraClear());
            d(apiClear());
            setSuccess(true);
        }
    });
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
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                        alignItems: "stretch",
                                    }}
                                >
                                    <ChartNew tensorValues={values} />
                                    <NamesAutocomplite />
                                    {isNew && (
                                        <TextField
                                            label={"new Name"}
                                            value={newName}
                                            onChange={(e) =>
                                                d(setNewName(e.target.value))
                                            }
                                        />
                                    )}
                                    {isNew && (
                                        <Button
                                            onClick={() => setModalNew(true)}
                                            variant="contained"
                                            disabled={newName.length < 3}
                                        >
                                            Add new
                                        </Button>
                                    )}
                                    {(led && !isNew) && (
                                        <Button
                                            variant="contained"
                                            onClick={() => setModal(true)}
                                        >
                                            Add new tensor
                                        </Button>
                                    )}
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
            <Modal open={modal} onClose={() => setModal(false)}>
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">Підтвердження дії</Typography>
                        <Typography variant="body1">
                            Ви дійсно бажаєте додати нові данні до{" "}
                            <b>{led?.name}</b>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setModal(false);
                                d(addNewTensor());
                            }}
                        >
                            Підтвердити
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setModal(false)}
                        >
                            Скасувати
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
            <Modal open={modalNew} onClose={() => setModalNew(false)}>
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">Підтвердження дії</Typography>
                        <Typography variant="body1">
                            Ви дійсно бажаєте додати новий світлодіод{" "}
                            <b>{newName}</b>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setModalNew(false);
                                d(addNewLed())
                            }}
                        >
                            Підтвердити
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setModalNew(false)}
                        >
                            Скасувати
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
            <Snackbar
                open={success}
                onClose={() => setSuccess(false)}
                autoHideDuration={6000}
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    variant="filled"
                >
                    Ви успішно додали данні
                </Alert>
            </Snackbar>
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
