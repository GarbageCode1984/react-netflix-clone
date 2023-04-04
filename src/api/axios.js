import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "f6acfa0f766984846f3091f1cb9ae37a",
        language: "ko-KR",
    },
});
export default instance;
