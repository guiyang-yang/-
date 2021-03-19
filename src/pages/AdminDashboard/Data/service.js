import request from 'umi-request'

export function getDataInfo(params){
    return request(`/ResSystem/saleData/list_select_data`,{
        method:'POST',
        data: params
    })
}

