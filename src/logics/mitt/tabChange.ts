import { RouteLocationNormalized } from 'vue-router';
import { getRoute } from '/@/utils/helper/routeHelper';
import Mitt from '/@/utils/mitt';

const mitt = new Mitt(),
  key = Symbol();

let lastChangeTab: RouteLocationNormalized;
export function setLastChangeTab(lastChangeTab: RouteLocationNormalized) {
  const r = getRoute(lastChangeTab);
  mitt.emit(key, r);
  lastChangeTab = r;
}

export function listenerLastChangeTab(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  mitt.on(key, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}

export function removeTabChangeListener() {
  mitt.clear();
}
