import request from 'umi-request'

export function getOrderInfo(params){
    return request(`/ResSystem/order/list_select_customer`,{
        method:'POST',
        data: params
    })
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