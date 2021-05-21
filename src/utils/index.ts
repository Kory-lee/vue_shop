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
    matched: (matched
      ? matched.map(({ meta, name = '', path = '' }) => ({
          meta,
          name,
          path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
