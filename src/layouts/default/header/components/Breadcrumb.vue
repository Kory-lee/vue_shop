<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <Icon v-if="getShowBreadCrumbIcon && getIcon(route)" :icon="getIcon(route)" />
        <span v-if="!hasRedirect(routes, route)"> {{ t(route.name || route.meta.title) }}</span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ t(route.name || route.meta.title) }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
  import type { MenuType } from '/@/router/types';
  import type { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb';

  import { Breadcrumb } from 'ant-design-vue';
  import { defineComponent, PropType, Ref, ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { RouteLocationMatched, useRouter } from 'vue-router';
  import { useProviderContext } from '/@/components/Application';
  import Icon from '/@/components/Icon';
  import { getShowBreadCrumbIcon } from '/@/hooks/setting/useRootSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { filter } from '/@/utils/helper/treeHelper';
  import { isString } from '/@/utils/is';
  import { getAllParentPath } from '/@/utils/helper/menuHelper';
  import { getMenus } from '/@/router/menus';

  const filterItem = (list: RouteLocationMatched[]) => {
    return filter(list, (item) => {
      const { meta } = item;
      if (!meta) return false;
      const { title, hideBreadcrumb, hideMenu } = meta;
      return !(!title || hideBreadcrumb || hideMenu);
    }).filter((item) => !item.meta?.hideBreadcrumb || !item.meta?.hideMenu);
  };

  function getMatched(menus: MenuType[], parent: string[]) {
    const matched: MenuType[] = [];
    menus.forEach((item) => {
      if (parent.includes(item.path)) {
        matched.push({
          ...item,
          name: item.meta?.title || item.name,
        });
        if (item.children?.length) matched.push(...getMatched(item.children, parent));
      }
    });
    return matched;
  }

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { 'a-breadcrumb': Breadcrumb, Icon },
    props: { theme: { type: String as PropType<'light' | 'dark'>, default: 'light' } },
    setup() {
      const { getPrefixCls } = useProviderContext();

      const routes = ref<RouteLocationMatched[]>([]);
      const { currentRoute } = useRouter(),
        { t } = useI18n();
      const go = useGo();

      watchEffect(async () => {
        if (currentRoute.value.name === REDIRECT_NAME) return;
        const menus = await getMenus();

        const routeMatched = currentRoute.value.matched;
        const cur = routeMatched?.[routeMatched.length - 1];
        let path = currentRoute.value.path;

        if (cur && cur?.meta?.currentActiveMenu) {
          path = cur.meta.currentActiveMenu as string;
        }

        const parent = getAllParentPath(menus, path);
        const filterMenus = menus.filter((item) => item.path === parent[0]);
        const matched = getMatched(filterMenus, parent) as any;

        if (!matched || matched.length === 0) return;

        const breadcrumbList = filterItem(matched);

        if (currentRoute.value.meta?.currentActiveMenu) {
          breadcrumbList.push({
            ...currentRoute.value,
            name: currentRoute.value.meta?.title || currentRoute.value.name,
          } as unknown as RouteLocationMatched);
        }
        routes.value = breadcrumbList;
      });

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault();
        const { children, redirect, meta } = route;
        if (children?.length && !redirect) {
          e?.stopPropagation();
          return;
        }
        if (meta?.carryParam) return;

        if (redirect && isString(redirect)) go(redirect);
        else {
          let path;
          if (paths.length === 1) path = paths[1];
          else {
            const ps = paths.splice(1),
              lastPath = ps.pop() || '';
            path = `${lastPath}`;
          }
          path = /^\//.test(path) ? path : `/${path}`;
          go(path);
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        return routes.indexOf(route) !== routes.length - 1;
      }

      function getIcon(route) {
        return route.icon || route.meta?.icon;
      }

      return {
        prefixCls: getPrefixCls('layout-breadcrumb'),
        getIcon,
        routes: routes as unknown as Ref<Route[]>,
        t,
        getShowBreadCrumbIcon,
        handleClick,
        hasRedirect,
      };
    },
  });
</script>

<style lang="less">
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
