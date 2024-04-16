import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { updateLedData } from "../store/apiReducer";

export default function EditLedData({ open, setOpen, data }) {
    const { t } = useTranslation();
    let [newName, setNewName] = useState(data?.name || "");
    let [newDescription, setNewDescription] = useState(data?.description || "");
    let [newImage, setNewImage] = useState(null);
    let [newImageURL, setNewImageURL] = useState(null);
    let dispatch = useDispatch();
    useEffect(() => {
        async function load() {
            if (newImage) {
                let url = await readImage(newImage);
                console.log(url);
                setNewImageURL(url);
            }
        }
        load();
    }, [newImage]);
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle sx={{ position: "relative", padding: "1rem 3rem" }}>
                {t("led.edit")}
                <IconButton
                    sx={{ position: "absolute", right: 8, top: 8 }}
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
                <TextField
                    label={t("led.name")}
                    helperText={newName?.length < 3 ? t("led.nameHelper") : ""}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label={t("led.description")}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    multiline
                    fullWidth
                />
                {newImageURL && (
                    <NewImageElement src={newImageURL} alt="new image" />
                )}
                <Button
                    component="label"
                    variant="contained"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                >
                    {t("led.image")}
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setNewImage(e.target.files[0])}
                    />
                </Button>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        dispatch(updateLedData({name: newName, description: newDescription, img: newImageURL || data.img }));
                        setOpen(false);
                    }}
                    sx={{ marginTop: "1rem" }}
                    color="success"
                    disabled={newName.length < 3}
                >
                    {t("led.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const VisuallyHiddenInput = styled("input")({
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

function readImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

let NewImageElement = styled.img`
    height: 200px;
    align-self: center;
`;
