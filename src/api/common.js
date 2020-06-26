import service from '@utils/request';
// import { GetCategory } from './new';
// import { reactive } from '@vue/composition-api';

// export function submitRequest(fn, cb) {
//   const category = reactive({ item: [] });
//   const getInfoCategory = () =>
//     GetCategory({})
//       .then((result) => (category.item = result.data))
//       .catch(() => {});
//   return {
//     getInfoCategory,
//     category,
//   };
// }
// 获取token
export function ImageToken(data) {
  return service.request({
    method: 'post',
    url: '/uploadImgToken/',
    data,
  });
}
