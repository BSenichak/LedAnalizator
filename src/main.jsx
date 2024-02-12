import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import "./assets/i18n";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme.js";
import { useSelector } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>
);

function Main() {
    let themeName = useSelector((s) => s.general.theme);
    return (
        <ThemeProvider theme={themeName == "light" ? lightTheme : darkTheme}>
            <App />
        </ThemeProvider>
    );
}
