import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as tf from "@tensorflow/tfjs";

const tfSlise = createSlice({
    name: "tf",
    initialState: {
        values: null,
        chanel: 0,
    },
    reducers: {
        setChanel: (state, action)=>{
            state.chanel = action.payload
        }
    },
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
            s.values = a.payload
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
          image.height,
          image.width,
        ]);
  
        const colors = await spectrumLines.data();
  
        // Assuming the correct shape is [1, image.width, 4]
        const height = image.height;
        const width = image.width;
  
        // Get the middle row index
        const middleRow = Math.floor(height / 2);
  
        // Reshape the tensor to the correct shape
        const reshapedColors = tf.tensor3d(colors, [height, width, 3]);
  
        // Get the middle row of colors
        const middleRowColors = reshapedColors.arraySync()[middleRow];
        
        
        return middleRowColors;
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

export const {setChanel} = tfSlise.actions
