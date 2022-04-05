import type { App, Plugin } from 'vue';
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';

export const noop = () => {};

export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched?.map?.(({ meta, name = '', path = '' }) => ({
      meta,
      name,
      path,
    })) ?? []) as RouteRecordNormalized[],
    //  ,
  };
}

export function withInstall<T>(component: T, alias?: string) {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    alias && (app.config.globalProperties[alias] = component);
  };
  return component as T & Plugin;
}
