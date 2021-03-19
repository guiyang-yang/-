import request from 'umi-request'

export function getTableInfo(params){
    return request(`/ResSystem/table/list_select_table`,{
        method:'POST',
        data: params
    })
}

export function DeleteTableInfo(params){
    return request(`/ResSystem/table/delete_table`,{
        method:'POST',
        data: params})
}

export function newTableInfo(params){
    return request(`/ResSystem/table/insert_table`,{
        method:'POST',
        data: params})
}
export function editTableInfo(params){
    return request(`/ResSystem/table/update_table`,{
        method:'POST',
        data: params})
}
