import { unref } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';
import { PageEnum } from '../../enums/pageEnum';
import { isString } from '/@/utils/is';
export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };
function handleError(e: Error) {
  console.error(e);
  // 为了大于打开时候设置的100延时防止闪动
  setTimeout(() => {}, 101);
}
export function useGo() {
  const { push, replace } = useRouter();
  return (opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) => {
    if (!opt) return;
    if (isString(opt)) isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  };
}

export const useRefresh = () => {
  const { push, currentRoute } = useRouter();
  const { query, params } = currentRoute.value;
  return () => push({ path: '/redirect' + unref(currentRoute).fullPath, query, params });
};
