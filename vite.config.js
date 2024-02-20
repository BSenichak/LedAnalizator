import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            injectRegister: "auto",
            registerType: "autoUpdate",
            manifest: {
                name: "Led Analizator",
                short_name: "LED Analiz",
                start_url: "/?pwa=1",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#005caa",
                lang: "uk-UA",
                // shortcuts: [
                //     {
                //         name: "Створити заявку",
                //         url: "/create",
                //     },
                // ],
                icons: [
                    {
                        src: "/imageslogo.svg",
                        type: "image/svg+xml",
                        purpose: "any",
                    }
                ],
            },
        }),
    ],
    build: {
      sourcemap: true
    }
});
