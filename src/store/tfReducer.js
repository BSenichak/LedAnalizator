import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as tf from "@tensorflow/tfjs";

const tfSlise = createSlice({
    name: "tf",
    initialState: {
        values: null,
        loading: false
    },
    reducers: {
        clearValues: (state) => {
            state.values = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadTensorFlow.rejected, (s, a) => {
            console.log(a.error);
        });
        builder.addCase(convertSpectrumToColors.pending, (s, a) => {
            s.values = a.payload;
            s.loading = true
        });
        builder.addCase(convertSpectrumToColors.fulfilled, (s, a) => {
            s.values = a.payload;
            s.loading = false
        });
        builder.addCase(convertSpectrumToColors.rejected, (s, a) => {
            console.log(a.error);
            s.loading = false
        });
    },
});

export const convertSpectrumToColors = createAsyncThunk(
    "convertSpectrumToColors",
    async (data, { getState }) => {
        try {
            const image = new Image();
            image.src = getState().camera.image;

            const height = image.width;
            const width = image.height;

            const tensorImage = tf.browser.fromPixels(image);
            let spectrumLines = tf.image.resizeNearestNeighbor(tensorImage, [
                height,
                width,
            ]);
            const colors = await spectrumLines.data();

            const middleRow = Math.floor(height / 2);
            const reshapedColors = tf.tensor3d(colors, [height, width, 3]);
            const middleRowColors = reshapedColors.arraySync()[middleRow];
            let trimed = trimArray(middleRowColors, 20);
            let resized = await tf.image
                .resizeNearestNeighbor([trimed], [3, 100])
                .data();
            const length = Math.floor(resized.length / 3);
            const trimmedArray = resized.slice(length, length * 2);

            const minValue = Math.min(...trimmedArray);
            const maxValue = Math.max(...trimmedArray);
            const normalizedArray = trimmedArray.map(
                (value) => ((value - minValue) * 255) / (maxValue - minValue)
            );

            let data = to2DArray([...normalizedArray]);
            tf.dispose();

            return data;
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

function trimArray(data, rate) {
    let startIndex = data.findIndex((row) => row.some((value) => value > rate));
    if (startIndex !== -1) {
        let endIndex = data.length - 1;
        while (endIndex >= 0 && !data[endIndex].some((value) => value > rate)) {
            endIndex--;
        }
        return data.slice(startIndex, endIndex + 1);
    }
    return [];
}

function to2DArray(data) {
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
        rows.push(data.slice(i, i + 3));
    }
    return rows;
}

export const { clearValues } = tfSlise.actions;

export default tfSlise.reducer;
