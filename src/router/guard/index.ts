import { Router } from 'vue-router';
import createPageLoadingGuard from './pageLoadingGuard';
import createPermissionGuard from './permissionGuard';
import createPageGuard from '/@/router/guard/pageGuard';
import { createStateGuard } from '/@/router/guard/stateGuard';
import { createNProgressGuard } from '/@/router/guard/nprogress';

export function createGuard(router: Router) {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
  createPageGuard(router);
  createStateGuard(router);
  createNProgressGuard(router);
}
