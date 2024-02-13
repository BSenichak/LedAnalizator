import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cameraSlice = createSlice({
    name: "canera",
    initialState: {
        cameraOpen: false,
        image: "",
        camera: null,
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
        builder.addCase(loadFoto.fulfilled, (state, action) => {
            state.image = action.payload;
          })
    },
});

export const loadFoto = createAsyncThunk("loadFoto", async (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file provided"));
        }

        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
});

export default cameraSlice.reducer;

export const { openCamera, closeCamera, setCamera, takeFoto } =
    cameraSlice.actions;
