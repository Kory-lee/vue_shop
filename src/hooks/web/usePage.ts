import { RouteLocationRaw, Router, useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/is';
import { warn } from '/@/utils/log';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };
function handleError(e: Error) {
  console.error(e);
}
export function useGo(router?: Router) {
  const { push, replace } = router || useRouter();
  return async function (
    opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME,
    isReplace = false
  ) {
    if (!opt) return;

    const pushOrReplace = isReplace ? replace : push;
    try {
      if (isString(opt)) await pushOrReplace(opt);
      else await pushOrReplace(opt as RouteLocationRaw);
    } catch (e) {
      handleError(e);
    }
  };
}

export const useRefresh = (router?: Router) => {
  const { push, currentRoute } = router || useRouter();
  const { query, params, fullPath } = currentRoute.value;
  return async function refresh() {
    try {
      await push({ path: '/redirect' + fullPath, query, params });
      return true;
    } catch (e) {
      warn(e);
    }
  };
};
