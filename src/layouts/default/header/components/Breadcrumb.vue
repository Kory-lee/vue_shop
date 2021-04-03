<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <Icon :icon="route.meta.icon" v-if="getShowBreadCrumbIcon && route.meta.icon" />
        <span v-if="!hasRedirect(routes, route)"> {{ t(route.meta.title) }}</span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">{{
          t(route.meta.title)
        }}</router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
  import { Breadcrumb } from 'ant-design-vue';
  import { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb';
  import { defineComponent, PropType, Ref, ref, toRaw, unref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { RouteLocationMatched, useRouter } from 'vue-router';
  import { useProviderContext } from '/@/components/Application';
  import Icon from '/@/components/Icon';
  import { PageEnum } from '/@/enums/pageEnum';
  import { getShowBreadCrumbIcon } from '/@/hooks/setting/useRootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { filter } from '/@/utils/helper/treeHelper';
  import { isString } from '/@/utils/is';

  const filterItem = (list: RouteLocationMatched[]) => {
    let resultList = filter(list, (item) => {
      const { meta } = item;
      if (!meta) return false;
      const { title, hideBreadcrumb, hideMenu } = meta;
      if (!title || hideBreadcrumb || hideMenu) return false;
      return true;
    }).filter(
      (item) =>
        !item.meta?.hideBreadcrumb || !item.meta?.hideMenu || item.path !== PageEnum.BASE_HOME
    );
    // resultList = resultList.filter((item) => item.path !== PageEnum.BASE_HOME);
    return resultList;
  };

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    props: { theme: String as PropType<'light' | 'dark'> },
    components: { 'a-breadcrumb': Breadcrumb, Icon },
    setup() {
      const { getPrefixCls } = useProviderContext();

      const routes = ref<RouteLocationMatched[]>([]);
      const { currentRoute } = useRouter(),
        { t } = useI18n();
      watchEffect(() => {
        if (currentRoute.value.name === REDIRECT_NAME) return;
        const matched = currentRoute.value?.matched;
        if (!matched?.length) return;
        let breadcrumbList = filterItem(toRaw(matched));
        const filterBreadcrumbList = breadcrumbList.filter(
          (item) => item.path !== PageEnum.BASE_HOME
        );

        if (filterBreadcrumbList.length === breadcrumbList.length) {
          filterBreadcrumbList.unshift(({
            path: PageEnum.BASE_HOME,
            meta: { title: t('layout.header.home'), isLink: true },
          } as unknown) as RouteLocationMatched);
        }
        if (currentRoute.value.meta?.currentActiveMenu)
          filterBreadcrumbList.push((unref(currentRoute) as unknown) as RouteLocationMatched);
        routes.value = filterBreadcrumbList;
      });

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault();
        const { children, redirect, meta } = route;
        if (children?.length && !redirect) {
          e?.stopPropagation();
          return;
        }
        if (meta?.carryParam) return;
        const go = useGo();
        if (redirect && isString(redirect)) go(redirect);
        else {
          const ps = paths.splice(1),
            lastPath = ps.pop() || '',
            parentPath = ps.pop() || '';
          let path = `${parentPath}/${lastPath}`;
          path = /^\//.test(path) ? path : `/${path}`;
          go(path);
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        if (routes.indexOf(route) === routes.length - 1) return false;
        return true;
      }
      return {
        prefixCls: getPrefixCls('layout-breadcrumb'),
        routes: (routes as unknown) as Ref<Route[]>,
        t,
        getShowBreadCrumbIcon,
        handleClick,
        hasRedirect,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-breadcrumb';

  .@{prefix-cls} {
    display: flex;
    padding: 0 8px;
    align-items: center;

    .ant-breadcrumb-link {
      .anticon {
        margin-right: 4px;
        margin-bottom: 2px;
      }
    }
    &--light {
      .ant-breadcrumb-link {
        color: @breadcrumb-item-normal-color;
        a {
          color: rgba(0, 0, 0, 0.65);
          &:hover {
            color: @primary-color;
          }
        }
      }
      .ant-breadcrumb-separator {
        color: @breadcrumb-item-normal-color;
      }
    }
    &--dark {
      .ant-breadcrumb-link {
        color: rgba(255, 255, 255, 0.6);

        a {
          color: rgba(255, 255, 255, 0.8);

          &:hover {
            color: @white;
          }
        }
      }

      .ant-breadcrumb-separator,
      .anticon {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
</style>
