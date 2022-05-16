import $http_base from "./index";
export const $http_tags = () => {
    $http_base.get('/api/v1/tags').then(
        res => {
            console.log(res)
        }
    ).catch(function (error) {
        console.log(error);
    });
}