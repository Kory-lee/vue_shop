import { Router } from 'vue-router';
import createPageLoadingGuard from './pageLoadingGuard';
import createPermissionGuard from './permissionGuard';
import createPageGuard from '/@/router/guard/pageGuard';
import { createStateGuard } from '/@/router/guard/stateGuard';

export function createGuard(router: Router) {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
  createPageGuard(router);
  createStateGuard(router);
}
