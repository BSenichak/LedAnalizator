import { Tuple, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import generalReducer from "./generalReducer";
import cameraReducer from "./cameraReducer";
import tfReducer from "./tfReducer";
import apiReducer from "./apiReducer";

export default  configureStore({
    reducer: {
        general: generalReducer,
        camera: cameraReducer,
        tf: tfReducer,
        api: apiReducer
    },
    middleware: ()=> new Tuple(thunk, logger)
})