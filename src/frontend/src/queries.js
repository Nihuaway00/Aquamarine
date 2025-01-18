import {$api} from "./axios.mjs";
import {API_REMOVE_PAGE_URL} from "./consts.js";



export const removePages = async (file, pagesToRemove) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pagesToRemove', JSON.stringify(pagesToRemove));

    const res = await $api.post(API_REMOVE_PAGE_URL, formData);
    return res.data;
}