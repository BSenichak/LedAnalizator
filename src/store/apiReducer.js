import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../assets/axios";
const apiSlice = createSlice({
    name: "api",
    initialState: {
        loading: false,
        names: [],
        choose: null,
        newName: "",
        done: false
    },
    reducers: {
        setName: (state, action) => {
            state.choose = action.payload;
        },
        setNewName: (state, action) => {
            state.newName = action.payload;
        },
        apiClear: (state)=> {
            state.names = [],
            state.newName = "",
            state.done = false,
            state.choose = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makePredict.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(makePredict.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload?.data.tensor);
            })
            .addCase(makePredict.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error);
            });
        builder
            .addCase(loadNames.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadNames.fulfilled, (state, action) => {
                state.loading = false;
                state.names = [
                    { name: "Add new", _id: "0", tensorsCount: "" },
                    ...action.payload.data,
                ];
            })
            .addCase(loadNames.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error);
            });
        builder
            .addCase(addNewLed.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addNewLed.fulfilled, (state, action) => {
                state.loading = false;
                state.done = action.payload 
            })
            .addCase(addNewLed.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error);
            });
        builder
            .addCase(addNewTensor.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addNewTensor.fulfilled, (state, action) => {
                state.loading = false;
                state.done = action.payload 
            })
            .addCase(addNewTensor.rejected, (state, action) => {
                state.loading = false;
                console.log(action.error);
            });
    },
});

export const makePredict = createAsyncThunk(
    "api/makePredict",
    async (data, { getState }) => {
        try {
            let response = await axios({
                method: "post",
                url: "/check",
                data: {
                    tensor: getState().tf.values,
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const loadNames = createAsyncThunk(
    "api/loadNames",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: "/getallledsnames",
            });
            return response;
        } catch (error) {
            if (error.response) {
                throw error.response.data.message;
            } else {
                return rejectWithValue({
                    originalError: error,
                });
            }
        }
    }
);
export const addNewLed = createAsyncThunk(
    "api/addNewLed",
    async (data, { rejectWithValue, getState }) => {
        try {
            let name = getState().api.newName
            let tensor = getState().tf.values
            const response = await axios({
                method: "post",
                url: "/addLed",
                data: {
                    tensors: [tensor],
                    name,
                },
            });
            return true;
        } catch (error) {
            if (error.response) {
                throw error.response.data.message;
            } else {
                return rejectWithValue({
                    originalError: error,
                });
            }
        }
    }
);
export const addNewTensor = createAsyncThunk(
    "api/addNewTensor",
    async (data, { rejectWithValue, getState }) => {
        try {
            let _id = getState().api.choose.id
            let tensor = getState().tf.values
            const response = await axios({
                method: "post",
                url: "/addtensor",
                data: {
                    tensor,
                    _id,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                throw error.response.data.message;
            } else {
                return rejectWithValue({
                    originalError: error,
                });
            }
        }
    }
);

export const { setName, setNewName, apiClear } = apiSlice.actions;

export default apiSlice.reducer;
