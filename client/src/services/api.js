import axios from "axios";

const API = axios.create({

  baseURL: "https://task-manager-app-nwkk.onrender.com/api"

});

export default API;