import $http_base from './index.js'
// import Qs from 'qs'
export const $http_login = (param) => {
    // console.log(Qs.stringify(param));
    return $http_base.post("/login",param)
}
