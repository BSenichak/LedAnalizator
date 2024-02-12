import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as tf from "@tensorflow/tfjs";

const tfSlise = createSlice({
    name: "tf",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(loadTensorFlow.pending, (s, a) => {
            console.log("start");
        });
        builder.addCase(loadTensorFlow.fulfilled, (s, a) => {
            console.log("done");
        });
        builder.addCase(loadTensorFlow.rejected, (s, a) => {
            console.log(a.error);
        });
        builder.addCase(convertSpectrumToColors.pending, (s, a) => {
            console.log("start");
        });
        builder.addCase(convertSpectrumToColors.fulfilled, (s, a) => {
            console.log(a.payload);
        });
        builder.addCase(convertSpectrumToColors.rejected, (s, a) => {
            console.log(a.error);
        });
    },
});

export const convertSpectrumToColors = createAsyncThunk(
    "convertSpectrumToColors",
    async (data, { getState }) => {
        try {
            const image = new Image();
            image.src = getState().camera.image;

            const tensorImage = tf.browser.fromPixels(image);
            const spectrumLines = tf.image.resizeBilinear(tensorImage, [
                1,
                image.width,
            ]);

            const colors = await spectrumLines.data();

            // Assuming the correct shape is [1, image.width, 4]
            const height = 1;
            const width = image.width;

            // Reshape the tensor to the correct shape
            const reshapedColors = tf.tensor3d(colors, [height, width, 3]);

            // Get the values of the reshaped tensor
            const tensorValues = reshapedColors.arraySync();
            return tensorValues;
        } catch (error) {
            throw error;
        }
    }
);

export const loadTensorFlow = createAsyncThunk("loadTF", async () => {
    try {
        await tf.ready();
    } catch (error) {
        throw error;
    }
});
export default tfSlise.reducer;
