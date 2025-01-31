import {REMOVE_PAGE_URL} from "./consts.js";
import {$api} from "./axios.mjs";

export const removePages = async ({file, pagesToRemove}) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pagesToRemove', JSON.stringify(pagesToRemove));
    return $api.post(REMOVE_PAGE_URL, formData);
}