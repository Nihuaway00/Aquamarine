import axios from "axios";
import {API_URL} from "./consts.js";

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  validateStatus: (status) => status >= 200 && status < 300, // Axios выбросит ошибку при 4xx и 5xx
});

export {$api}