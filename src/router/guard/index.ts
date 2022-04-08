import type { RouteLocationNormalized, Router } from 'vue-router';

import createPageLoadingGuard from './pageLoadingGuard';
import createPermissionGuard from './permissionGuard';
import { createPageGuard } from '/@/router/guard/pageGuard';
import { createStateGuard } from '/@/router/guard/stateGuard';
import { createNProgressGuard } from '/@/router/guard/nprogress';
import projectSetting from '/@/settings/projectSetting';
import AxiosCanceler from '/@/utils/http/AxiosCancel';
import { warn } from '/@/utils/log';
import { Modal, notification } from 'ant-design-vue';

export function createGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createPermissionGuard(router);
  createStateGuard(router);
  createNProgressGuard(router);
}

function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) axiosCanceler = new AxiosCanceler();
  router.beforeEach(() => {
    axiosCanceler?.removeAllPending();
    return true;
  });
}

function createScrollGuard(router: Router) {
  const isHash = (href = '') => /^#/.test(href);
  const body = document.body;
  router.afterEach((to) => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll();
        notification.destroy();
      }
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}
