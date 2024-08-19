import axios from "axios"

export const recipeFetch = axios.create({
    baseURL: "https://teste-tecnico-front-api.up.railway.app/",
    headers:{
        "Content-Type": "application/json"
    }
})