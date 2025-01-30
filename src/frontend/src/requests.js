import {$api} from "./axios.mjs";
import {API_URL, REMOVE_PAGE_URL} from "./consts.js";

export const removePages = async ({file, pagesToRemove}) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pagesToRemove', JSON.stringify(pagesToRemove));
    console.log(REMOVE_PAGE_URL, API_URL);
    const res = await $api.post(REMOVE_PAGE_URL, formData);
    return res.data;
}