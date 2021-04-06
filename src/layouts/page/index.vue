<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { getTransitionName } from './transition';
  import { getShowMultipleTab } from '../../hooks/setting/useMultipleTabSetting';
  import { getCanEmbedIFramePage, getOpenKeepAlive } from '../../hooks/setting/useRootSetting';
  import { getBasicTransition, getEnableTransition } from '/@/hooks/setting/useTransitionSetting';

  export default defineComponent({
    name: 'PageLayout',
    setup() {
      const getCaches = computed(() => {
          return [];
        }),
        openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      return {
        getTransitionName,
        getBasicTransition,
        getEnableTransition,
        getCanEmbedIFramePage,
        getCaches,
        openCache,
      };
    },
  });
</script>

<style></style>
