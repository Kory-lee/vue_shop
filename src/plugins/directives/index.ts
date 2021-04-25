import type { App } from 'vue-demi';
import { setupLoadingDirective } from './loading';

export function setupGlobalDirective(app: App) {
  setupLoadingDirective(app);
}

export default setupGlobalDirective;
