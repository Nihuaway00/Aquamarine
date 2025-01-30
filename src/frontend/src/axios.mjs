import {Axios} from "axios";
import {API_URL} from "./consts.js";

const $api = new Axios({
    baseURL: API_URL
});

export {$api}