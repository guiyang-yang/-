import request from 'umi-request'

export function getUserInfo(params){
    return request(`/ResSystem/user/list_select_all_customer`,{
        method:'POST',
        data: params})
}
export function EditUser(params){
    return request(`/ResSystem/user/update_customer`,{
        method:'POST',
        data: params})
}
export function AddUser(params){
    return request(`/ResSystem/user/insert_customer`,{
        method:'POST',
        data: params})
}
export function RemoveUser(params){
    return request(`/ResSystem/user/delete_customer`,{
        method:'POST',
        data: params})
}
export function DownLoadUser(params){
    return request(`/ResSystem/user/download_user`,{
        method:'POST',
        data: params,
        ContentType:'blob'})
}