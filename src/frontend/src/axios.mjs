import {Axios} from "axios";

const $api = new Axios({
    withCredentials: true,

});

export {$api}