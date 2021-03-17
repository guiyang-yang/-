import request from 'umi-request'

export function getOrderInfo(params){
    return request(`/ResSystem/order/list_select_customer`,{
        method:'POST',
        data: params
    })
}
export function orderRefund(params){
    return request(`/ResSystem/order/refund_order`,{
        method:'POST',
        data: params})
}
export function DeleteOrderInfo(params){
    return request(`/ResSystem/order/delete_order`,{
        method:'POST',
        data: params})
}