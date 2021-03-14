import request from 'umi-request'

export function getUserInfo(params){
    return request(`/carSystem/alluserInfo`,{params})
}
export function opertionBlack(params){
    return request(`/carSystem/opertionBlack`,{
        method:'POST',
        data: params})
}
export function DeleteForumInfo(params){
    return request(`/carSystem/deleteForumInfo`,{
        method:'POST',
        data: params})
}