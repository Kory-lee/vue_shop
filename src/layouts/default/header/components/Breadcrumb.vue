<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <ABreadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <span>{{ t(route.meta.title) }}</span>
      </template>
    </ABreadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref, toRaw, unref, watchEffect } from 'vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
import { Breadcrumb } from 'ant-design-vue';
import { RouteLocationMatched, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { REDIRECT_NAME } from '/@/router/constant';
import { filter } from '/@/utils/helper/treeHelper';
import { PageEnum } from '/@/enums/PageEnum';

const filterItem = (list: RouteLocationMatched[]) => {
  let resultList = filter(list, (item) => {
    const { meta } = item;
    if (!meta) return false;
    const { title, hideBreadcrumb, hideMenu } = meta;
    if (!title || hideBreadcrumb || hideMenu) return false;
    return true;
  }).filter(
    (item) => !item.meta?.hideBreadcrumb || !item.meta?.hideMenu || item.path !== PageEnum.BASE_HOME
  );
  // resultList = resultList.filter((item) => item.path !== PageEnum.BASE_HOME);
  return resultList;
};

export default defineComponent({
  name: 'LayoutBreadcrumb',
  props: { theme: String as PropType<'light' | 'dark'> },
  components: { ABreadcrumb: Breadcrumb },
  setup() {
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    const routes = ref<RouteLocationMatched[]>([]);
    const { currentRoute } = useRouter(),
      { t } = useI18n();
    watchEffect(() => {
      if (currentRoute.value.name === REDIRECT_NAME) return;
      const matched = currentRoute.value?.matched;
      if (!matched?.length) return;
      let breadcrumbList = filterItem(toRaw(matched));
      // TODO Home page
      if (currentRoute.value.meta?.currentActiveMenu)
        breadcrumbList.push((unref(currentRoute) as unknown) as RouteLocationMatched);
      routes.value = breadcrumbList;
    });

    return { prefixCls: getPrefixCls('layout-breadcrumb'), routes, t };
  },
});
</script>

<style></style>
