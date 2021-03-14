
import request from 'umi-request'
export function ChangeuserInfo(params){
    return request(`/carSystem/changeuserInfo`,{
        method:'POST',
        data: params})
}