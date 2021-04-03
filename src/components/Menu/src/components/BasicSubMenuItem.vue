<template>
  <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" />
  <SubMenu
    v-else-if="menuHasChildren(item) && getShowMenu"
    :class="[theme]"
    popupClassName="app-top-menu-popup"
  >
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <BasicSubMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </SubMenu>
</template>
<script lang="ts">
  import { Menu } from 'ant-design-vue';
  import { computed, defineComponent } from 'vue';
  import { itemProps } from '../props';
  import BasicMenuItem from './BasicMenuItem.vue';
  import MenuItemContent from './MenuItemContent.vue';
  import { useProviderContext } from '/@/components/Application';
  import type { MenuType } from '/@/router/types';

  export default defineComponent({
    name: 'BasicSubMenuItem',
    components: {
      SubMenu: Menu.SubMenu,
      MenuItemContent,
      BasicMenuItem,
    },
    props: itemProps,
    setup(props) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-menu-item'),
        getShowMenu = computed(() => !props.item.meta?.hideMenu);

      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        );
      }
      return {
        prefixCls,
        menuHasChildren,
        getShowMenu,
      };
    },
  });
</script>

<style lang="less"></style>
