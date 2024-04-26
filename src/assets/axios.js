import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "http://192.168.31.212:3000/",

    // baseURL: "https://tfledanalysis.vercel.app",
});
