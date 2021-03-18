import request from 'umi-request'

export function getOrderInfo(params){
    return request(`/ResSystem/order/list_select_not_pay`,{
        method:'POST',
        data: params
    })
}
export function cacl(params){
    return request(`/ResSystem/order/count_money`,{
        method:'POST',
        data: params})
}
export function close(params){
    return request(`/ResSystem/order/update_order_pay`,{
        method:'POST',
        data: params})
}