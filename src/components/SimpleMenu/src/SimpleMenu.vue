<template>
  <!-- v-bind="$props" -->
  <Menu
    :activeName="activeName"
    :openNames="getOpenKeys"
    @select="handleSelect"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    v-bind="$props"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapse="collapse"
        :collapsedShowTitle="collapsedShowTitle"
      />
    </template>
  </Menu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, reactive, ref, toRefs, unref, watch } from 'vue';
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
  import { useProviderContext } from '../../Application';
  import Menu from './components/Menu.vue';
  import SimpleSubMenu from './SimpleSubMenu.vue';
  import { SimpleMenuState } from './types';
  import useOpenKeys from './useOpenKeys';
  import { createSimpleRootMenuContext } from './useSimpleMenuContext';
  import { MenuType } from '/@/router/types';
  import { isFunction } from '/@/utils/is';
  import Mitt from '/@/utils/mitt';

  export default defineComponent({
    name: 'SimpleMenu',
    components: { Menu, SimpleSubMenu },
    inheritAttrs: false,
    props: {
      items: { type: Array as PropType<MenuType[]>, default: () => [] },
      collapse: Boolean,
      mixSidebar: Boolean,
      theme: { type: String as PropType<'light' | 'dark'> },
      accordion: { type: Boolean, default: true },
      collapsedShowTitle: Boolean,
      beforeClickFn: { type: Function as PropType<(key: string) => Promise<boolean>> },
    },
    emits: ['menuClick'],
    setup(props, { emit, attrs }) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('simple-menu'),
        rootMenuEmitter = new Mitt(),
        currentActiveName = ref(''),
        activeName = ref(''),
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

      createSimpleRootMenuContext({
        rootMenuEmitter,
        activeName,
        isCollapse: computed(() => props.collapse),
      });

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) menuState.openNames = [];
          else setOpenKeys(currentRoute.value.path);
        },
        { immediate: true }
      );
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
      return { prefixCls, getOpenKeys, handleSelect, ...toRefs(menuState), handleMenuChange };
    },
  });
</script>

<style lang="less" scoped>
  @import './index';
</style>
