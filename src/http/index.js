import axios from "axios";

const $http_base = axios.create({
    // /base: 'https://localhost:8000',
    baseURL: '/base',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
$http_base.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.sign = "qiux"
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$http_base.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let _data = response.data
    return _data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default $http_base