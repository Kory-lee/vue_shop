<template>
  <Menu
    v-bind="$attrs"
    :active-name="activeName"
    :open-names="getOpenKeys"
    :class="prefixCls"
    :active-sub-menu-names="activeSubMenuNames"
    :collapse="collapse"
    :theme="theme"
    :accordion="accordion"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapse="collapse"
        :collapsed-show-title="collapsedShowTitle"
      />
    </template>
  </Menu>
</template>

<script lang="ts">
  import type { MenuType } from '/@/router/types';
  import type { SimpleMenuState } from './types';

  import { defineComponent, PropType, reactive, ref, toRefs, unref, watch } from 'vue';
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
  import { useProviderContext } from '../../Application';
  import Menu from './components/Menu.vue';
  import SimpleSubMenu from './SimpleSubMenu.vue';
  import useOpenKeys from './useOpenKeys';
  import { listenerLastChangeTab } from '/@/logics/mitt/tabChange';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { isFunction } from '/@/utils/is';

  export default defineComponent({
    name: 'SimpleMenu',
    components: { Menu, SimpleSubMenu },
    inheritAttrs: false,
    props: {
      items: { type: Array as PropType<MenuType[]>, default: () => [] },
      collapse: Boolean,
      mixSidebar: Boolean,
      theme: { type: String as PropType<'light' | 'dark'>, default: '' },
      accordion: { type: Boolean, default: true },
      collapsedShowTitle: Boolean,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>,
        default: () => {},
      },
      isSplitMenu: Boolean,
    },
    emits: ['menuClick'],
    setup(props, { emit }) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('simple-menu'),
        currentActiveName = ref(''),
        isClickGo = ref(false),
        menuState = reactive<SimpleMenuState>({
          activeName: '',
          openNames: [],
          activeSubMenuNames: [],
        }),
        { currentRoute } = useRouter(),
        { items, accordion, mixSidebar, collapse } = toRefs(props),
        { setOpenKeys, getOpenKeys } = useOpenKeys(
          menuState,
          items,
          accordion,
          mixSidebar,
          collapse
        );

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) menuState.openNames = [];
          else setOpenKeys(currentRoute.value.path);
        },
        { immediate: true }
      );

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) return;
          setOpenKeys(currentRoute.value.path);
        },
        { flush: 'post' }
      );

      listenerLastChangeTab((route) => {
        if (route.name === REDIRECT_NAME) return;

        currentActiveName.value = route.meta?.currentActiveName as string;
        handleMenuChange(route);

        if (unref(currentActiveName)) {
          menuState.activeName = unref(currentActiveName);
          setOpenKeys(unref(currentActiveName));
        }
      });

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;
        menuState.activeName = path;
        setOpenKeys(path);
      }
      async function handleSelect(key: string) {
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }
        emit('menuClick', key);

        isClickGo.value = true;
        setOpenKeys(key);
        menuState.activeName = key;
      }

      return { prefixCls, getOpenKeys, handleSelect, ...toRefs(menuState) };
    },
  });
</script>

<style lang="less">
  @import './index.less';
</style>
