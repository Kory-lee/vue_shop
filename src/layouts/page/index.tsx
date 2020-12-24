import {
  computed,
  defineComponent,
  FunctionalComponent,
  h,
  KeepAlive,
  Transition,
  unref
} from 'vue';
import { RouteLocation, RouterView } from 'vue-router';
import { useCache } from './useCache';
import { getOpenKeepAlive } from '/@/hooks/setting/RootSetting';
import { getBasicTransition, getEnabledTransition } from '/@/hooks/setting/TransitionSetting';
// import FrameLayout from '/@/layouts/iframe/index.vue';

// import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
// import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

interface DefaultContext {
  Component: FunctionalComponent & { type: { [key: string]: any } };
  route: RouteLocation;
}

// const FrameLayout=createAsyncComponent(()=>'/@/layouts/iframe/index.vue')
export default defineComponent({
  name: 'PageLayout',
  setup() {
    const { getCaches } = useCache(true);
    const openCache = computed(() => unref(getOpenKeepAlive));

    return () => {
      return (
        <>
          <RouterView>
            {{
              default: ({ Component, route }: DefaultContext) => {
                // No longer show animations that are already in the tab
                const cacheTabs = unref(getCaches),
                  isInCache = cacheTabs.includes(route.name as string);
                const name =
                  isInCache && route.meta.loaded && unref(getEnabledTransition)
                    ? 'fade-slide'
                    : null;

                // When the child element is the parentView, adding the key will cause the component to be executed multiple times. When it is not parentView, you need to add a key, because it needs to be compatible with the same route carrying different parameters
                const isParentView = Component?.type.parentView,
                  componentKey = isParentView ? {} : { key: route.fullPath };

                const renderComp = h(Component, { ...componentKey });
                const PageContent = unref(openCache)
                  ? h(KeepAlive, { include: cacheTabs }, renderComp)
                  : renderComp;

                if (!unref(getEnabledTransition)) return PageContent;
                return (
                  <Transition
                    name={name || route.meta.transitionName || unref(getBasicTransition)}
                    mode="out-in"
                    appear={true}
                  >
                    {() => PageContent}
                  </Transition>
                );
              },
            }}
          </RouterView>
          {/* {unref(getCanEmbedIFramePage) && <FrameLayout />} */}
        </>
      );
    };
  },
});
