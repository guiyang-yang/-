import request from 'umi-request';

export async function loginCheck(params) {
  return request(`/ResSystem/user/admin_login`,{
      method:'POST',
      data:params
  })
}

