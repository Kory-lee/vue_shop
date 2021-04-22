import { unref } from 'vue';
import { RouteLocationRaw, Router, useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/is';
import { warn } from '/@/utils/log';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };
function handleError(e: Error) {
  console.error(e);
}
export function useGo(router?: Router) {
  if (!router) router = useRouter();

  const { push, replace } = router;
  return async function (
    opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME,
    isReplace = false
  ) {
    if (!opt) return;

    try {
      const pushOrReplace = isReplace ? replace : push;

      if (isString(opt)) await pushOrReplace(opt);
      else {
        const o = opt as RouteLocationRaw;
        await pushOrReplace(o);
      }
    } catch (e) {
      handleError(e);
    }
  };
}

export const useRefresh = (router?: Router) => {
  if (!router) router = useRouter();

  const { push, currentRoute } = router;
  const { query, params } = currentRoute.value;
  async function refresh() {
    // function refresh() {
    //   return new Promise((resolve) => {
    //     push({ path: '/redirect' + unref(currentRoute).fullPath, query, params }).then(() =>
    //       resolve(true)
    //     );
    //   });
    // }
    try {
      await push({ path: '/redirect' + unref(currentRoute).fullPath, query, params });
      return true;
    } catch (e) {
      warn(e);
    }
  }
  return refresh;
};
