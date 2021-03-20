import request from 'umi-request'

export function getNoticeInfo(params){
    return request(`/ResSystem/saleAnnouncement/list_select_saleNotice`,{
        method:'POST',
        data: params
    })
}

export function DeleteNoticeInfo(params){
    return request(`/ResSystem/saleAnnouncement/delete_saleNotice`,{
        method:'POST',
        data: params})
}

export function newNoticeInfo(params){
    return request(`/ResSystem/saleAnnouncement/insert_saleNotice`,{
        method:'POST',
        data: params})
}
export function editNoticeInfo(params){
    return request(`/ResSystem/saleAnnouncement/update_saleNotice`,{
        method:'POST',
        data: params})
}

export function DownLoadNotice(params){
    return request(`/ResSystem/saleAnnouncement/download_notice`,{
        method:'POST',
        data: params,
        })
}