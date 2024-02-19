import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../assets/axios";
const apiSlice = createSlice({
    name: "api",
    initialState: {
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makePredict.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(makePredict.fulfilled, (state, action)=>{
            state.loading = false
            console.log(action.payload?.data.tensor)
        })
        .addCase(makePredict.rejected, (state, action)=>{
            state.loading = false
            console.log(action.error)
        })
    },
});

export const makePredict = createAsyncThunk("api/makePredict", async (data, {getState}) => {
    try {
        let response = await axios({
            method: "post",
            url: "/check",
            data: {
                tensor: getState().tf.values,
            },
        });
        return response
    } catch (error) {
        throw error
    }
});

export default apiSlice.reducer;
