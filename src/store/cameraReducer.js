import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearValues } from "./tfReducer";

const cameraSlice = createSlice({
    name: "canera",
    initialState: {
        cameraOpen: false,
        image: "",
        camera: null,
        loading: false
    },
    reducers: {
        openCamera: (state) => {
            state.cameraOpen = true;
        },
        closeCamera: (state) => {
            state.cameraOpen = false;
        },
        setCamera: (state, action) => {
            state.camera = action.payload;
        },
        takeFoto: (state) => {
            state.image = state.camera.getScreenshot();
            state.cameraOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadFoto.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(loadFoto.rejected, (state, action) => {
            state.loading = false
        });
        builder.addCase(loadFoto.fulfilled, (state, action) => {
            state.image = action.payload;
            state.loading = false
        });
    },
});

export const loadFoto = createAsyncThunk(
    "loadFoto",
    async (file, { dispatch }) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error("No file provided"));
            }
            dispatch(clearValues());

            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
);

export default cameraSlice.reducer;

export const { openCamera, closeCamera, setCamera, takeFoto } =
    cameraSlice.actions;
