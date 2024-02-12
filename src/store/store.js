import { Tuple, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import generalReducer from "./generalReducer";
import cameraReducer from "./cameraReducer";

export default  configureStore({
    reducer: {
        general: generalReducer,
        camera: cameraReducer,
    },
    middleware: ()=> new Tuple(thunk, logger)
})