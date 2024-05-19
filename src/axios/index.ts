import axios from "axios";



const instance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,

    headers: {
        'ngrok-skip-browser-warning':true
    }
})


export default instance;