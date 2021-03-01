import { unref } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import router from '/@/router';
import { isString } from '/@/utils/is';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };
function handleError(e: Error) {
  console.error(e);
}
export function useGo() {
  const { push, replace } = router;
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
  const { push, currentRoute } = router;
  const { query, params } = currentRoute.value;
  return new Promise((resolve) =>
    push({ path: '/redirect' + unref(currentRoute).fullPath, query, params }).then(() =>
      resolve(true)
    )
  );
};
