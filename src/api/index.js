import service from '@utils/request';
export function post(url, data) {
  return service.request({
    method: 'post',
    url,
    data,
  });
}
