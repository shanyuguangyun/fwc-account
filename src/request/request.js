import axios from "axios";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
    timeout: 15000 // 请求超时时间
});

export default service;