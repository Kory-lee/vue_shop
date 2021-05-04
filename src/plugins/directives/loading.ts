import { App, Directive } from 'vue-demi';
import { createLoading } from '/@/components/Loading';

const loadingDirective: Directive = {
  mounted(el, binding) {
    const tip = el.getAttribute('loading-tip'),
      background = el.getAttribute('loading-background'),
      size = el.getAttribute('loading-size') || 'large',
      fullscreen = binding.modifiers.fullscreen;

    el.instance = createLoading(
      {
        tip,
        background,
        size,
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el
    );
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));

    if (binding.oldValue === binding.value) return;
    instance.setLoading?.(binding.value && !instance.loading);
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;
