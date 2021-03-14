import request from 'umi-request'

export function getNotcieInfo(){
    return request(`/carSystem/notcieInfo`)
}

export function DeleteNoticeInfo(params){
    return request(`/carSystem/deleteNoticeInfo`,{
        method:'POST',
        data: params})
}

export function newNoticeInfo(params){
    return request(`/carSystem/newNoticeInfo`,{
        method:'POST',
        data: params})
}
