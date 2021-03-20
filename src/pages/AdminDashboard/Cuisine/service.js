
import request from 'umi-request'

export function getCuisine(params){
    return request(`/ResSystem/food/list_select_food`,{
        method:'POST',
        data: params
    })
}
export function AddCuisine(params){
    return request(`/ResSystem/food/insert_food`,{
        method:'POST',
        data: params})
}
export function EditCuisine(params){
    return request(`/ResSystem/food/update_food`,{
        method:'POST',
        data: params})
}
export function DeleteCuisine(params){
    return request(`/ResSystem/food/delete_food`,{
        method:'POST',
        data: params})
}

export function DownLoadCuisine(params){
    return request(`/ResSystem/food/download_food`,{
        method:'POST',
        data: params,
        })
}