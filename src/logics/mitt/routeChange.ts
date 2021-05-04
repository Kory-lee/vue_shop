import type { RouteLocationNormalized } from 'vue-router';

import Mitt from '/@/utils/mitt';
import { getRawRoute } from '/@/utils';

const mitt = new Mitt(),
  key = Symbol();

let routeChange: RouteLocationNormalized;
export function setRouteChange(lastChangeTab: RouteLocationNormalized) {
  routeChange = getRawRoute(lastChangeTab);
  mitt.emit(key, routeChange);
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  mitt.on(key, callback);
  immediate && routeChange && callback(routeChange);
}

export function removeRouteChangeListener() {
  mitt.clear();
}
