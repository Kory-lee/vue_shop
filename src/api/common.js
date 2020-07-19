import service from '@utils/request';
// 获取token
export function ImageToken(data) {
  return service.request({
    method: 'post',
    url: '/uploadImgToken/',
    data,
  });
}
