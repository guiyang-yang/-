import request from 'umi-request';

export async function loginCheck(params) {
  return request(`/carSystem/login`,{
      method:'POST',
      data:params
  })
}


export async function registerUser(params) {
  return request(`/carSystem/register`,{
      method:'POST',
      data:params
  })
}