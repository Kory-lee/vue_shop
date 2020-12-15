<script lang="ts">
import {
  computed,
  defineComponent,
  FunctionalComponent,
  h,
  KeepAlive,
  Transition,
  unref,
} from 'vue';
import { RouteLocation, RouterView } from 'vue-router';
import useCache from './useCache';
import useRootSetting from '/@/hooks/setting/RootSetting';
import useTransitionSetting from '/@/hooks/setting/TransitionSetting';
interface DefaultContext {
  Component: FunctionalComponent & { type: { [key: string]: any } };
  route: RouteLocation;
}
export default defineComponent({
  name: 'PageLayout',
  setup() {
    const { getCaches } = useCache(true);
    const { getOpenKeepAlive } = useRootSetting();
    const { getEnabledTransition } = useTransitionSetting();
    const openCache = computed(() => unref(getOpenKeepAlive) && unref(getEnabledTransition));
    return () =>
      h(RouterView, null, {
        default: ({ Component, route }: DefaultContext) => {
          const cacheTabs = getCaches.value,
            isInCache = cacheTabs.includes(route.name as string),
            name =
              isInCache && route.meta.loaded && getEnabledTransition.value ? 'fade-slide' : null,
            componentKey = Component?.type.parentView ? {} : { key: route.fullPath },
            renderComp = h(Component, componentKey),
            PageContent = openCache.value
              ? h(KeepAlive, { include: cacheTabs }, { default: () => renderComp })
              : renderComp;

          if (!getEnabledTransition.value) return PageContent;
          return h(
            Transition,
            { name: name || route.meta.transitionName, mode: 'out-in', appear: true },
            { default: () => PageContent }
          );
        },
      });
  },
});
</script>
