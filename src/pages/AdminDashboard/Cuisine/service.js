
import request from 'umi-request'

export function getCuisine(params){
    return request(`/ResSystem/alluserInfo`,{params})
}
export function opertionBlack(params){
    return request(`/carSystem/opertionBlack`,{
        method:'POST',
        data: params})
}
export function DeleteCarInfo(params){
    return request(`/carSystem/deleteCarInfo`,{
        method:'POST',
        data: params})
}