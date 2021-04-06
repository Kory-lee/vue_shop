<template>
  <Menu
    :selected-keys="selectedKeys"
    :default-selected-keys="defaultSelectedKeys"
    :mode="mode"
    :open-keys="getOpenKeys"
    :inline-indent="inlineIndex"
    :theme="theme"
    :class="getMenuClass"
    :sub-menu-open-delay="0.2"
    v-bind="getInlineColapseOptions"
    @openChange="handleOpenChange"
    @click="handleMenuClick"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :theme="theme" :is-horizontal="isHorizontal" />
    </template>
  </Menu>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, toRefs, unref } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { basicProps } from './props';
  import type { MenuState } from './types';
  import { useProviderContext } from '../../Application/src/Provider/useAppContext';
  import { useRouter } from 'vue-router';
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnums';
  import {
    getCollapsed,
    getIsHorizontal,
    getSplit,
    getTopMenuAlign,
  } from '/@/hooks/setting/useMenuSetting';
  import useOpenKeys from './useOpenKeys';
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue';
  import { isFunction } from '/@/utils/is';

  export default defineComponent({
    name: 'BasicMenu',
    components: { Menu, BasicSubMenuItem },
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false),
        currentActiveMenu = ref(''),
        menuState = reactive<MenuState>({
          defaultSelectedKeys: [],
          openKeys: [],
          selectedKeys: [],
          collapsedOpenKeys: [],
        });

      const { isMobile, getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-menu'),
        { items, mode, accordion } = toRefs(props),
        { currentRoute } = useRouter(),
        { setOpenKeys, getOpenKeys, handleOpenChange } = useOpenKeys(
          menuState,
          items,
          mode,
          accordion
        ),
        getIsTopMenu = computed(
          () =>
            (props.type === MenuTypeEnum.TOP_MENU && props.mode === MenuModeEnum.HORIZONTAL) ||
            (props.isHorizontal && unref(getSplit))
        ),
        getMenuClass = computed(() => {
          const align = props.isHorizontal && unref(getSplit) ? 'start' : unref(getTopMenuAlign);
          return [
            prefixCls,
            `justify-${align}`,
            {
              [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
              [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
            },
          ];
        }),
        getInlineColapseOptions = computed(() => {
          const isInline = props.mode === MenuModeEnum.INLINE,
            inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
          if (isInline)
            inlineCollapseOptions.inlineCollapsed = props.mixSidebar ? false : unref(getCollapsed);
          return inlineCollapseOptions;
        });

      async function handleMenuClick({ key }: { key: string; keyPath: string[] }) {
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }
        emit('menuClick', key);
        isClickGo.value = true;
        menuState.selectedKeys = [key];
      }

      return {
        prefixCls,
        getIsHorizontal,
        getMenuClass,
        getOpenKeys,
        getInlineColapseOptions,
        ...toRefs(menuState),
        handleMenuClick,
        handleOpenChange,
      };
    },
  });
</script>

<style lang="less">
  @import './index';
</style>
