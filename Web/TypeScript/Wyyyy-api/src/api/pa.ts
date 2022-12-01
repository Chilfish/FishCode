import { request } from './index';

export function getQRKey(params: object) {
  return request({
    url: '/login/qr/key',
    method: 'get',
    params,
  });
}
