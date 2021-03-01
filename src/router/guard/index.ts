import { Router } from 'vue-router';
import createPageLoadingGuard from './pageLoadingGuard';
import createPermissionGuard from './permissionGuard';
export function createGuard(router: Router) {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
}
