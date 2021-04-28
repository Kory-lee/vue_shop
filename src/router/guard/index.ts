import { Router } from 'vue-router';
import createPageLoadingGuard from './pageLoadingGuard';
import createPermissionGuard from './permissionGuard';
import createPageGuard from '/@/router/guard/pageGuard';

export function createGuard(router: Router) {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
  createPageGuard(router);
}
