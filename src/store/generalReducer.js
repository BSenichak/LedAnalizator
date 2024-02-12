import { createSlice } from "@reduxjs/toolkit";
import i18n from "../assets/i18n";

export const generalSlice = createSlice({
    name: "general",
    initialState: {
        theme: "light",
        lang: "uk",
    },
    reducers: {
        loadTheme: (state, action) => {
            state.theme = localStorage.getItem("theme") || "light";
        },
        toggleTheme: (state) => {
            let theme = state.theme == "light" ? "dark" : "light";
            state.theme = theme;
            localStorage.setItem("theme", theme);
        },
        loadLang: (state, action) => {
            state.lang = localStorage.getItem("lang") || "uk";
        },
        toggleLang: (state) => {
            let lang = state.lang == "uk" ? "en" : "uk";
            i18n.changeLanguage(lang)
            state.lang = lang;
            localStorage.setItem("lang", lang);
        },
    },
    extraReducers: (builder) => {},
});

export default generalSlice.reducer;

export const { loadTheme, toggleTheme, loadLang, toggleLang } = generalSlice.actions;
