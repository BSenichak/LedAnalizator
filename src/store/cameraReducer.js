import { createSlice } from "@reduxjs/toolkit";

const cameraSlice = createSlice({
    name: "canera",
    initialState: {
        cameraOpen: false,
        image: "",
        camera: null,
    },
    reducers: {
        openCamera: (state)=> {
            state.cameraOpen = true
        },
        closeCamera: (state)=> {
            state.cameraOpen = false
        },
        setCamera: (state, action)=>{
            state.camera = action.payload
        },
        takeFoto: (state)=>{
            state.image = state.camera.getScreenshot()
            state.cameraOpen = false
        }
        
    }
})

export default cameraSlice.reducer

export const { openCamera, closeCamera, setCamera, takeFoto} = cameraSlice.actions