<template>
  <li :class="getClass">
    <template v-if="!getCollapse">
      <div :class="`${prefixCls}-subMenu-title`" @click.stop="handleClick" :style="getItemStyle">
        <slot name="title" />
        <Icon
          icon="eva:arrow-ios-downward-outline"
          :size="14"
          :class="`${prefixCls}-submenu-title-icon`"
        />
      </div>
      <ul :class="prefixCls" v-show="opened">
        <slot />
      </ul>
    </template>
  </li>
</template>
<script lang="ts">
  import { Popover } from 'ant-design-vue';
  import {
    computed,
    CSSProperties,
    defineComponent,
    getCurrentInstance,
    inject,
    reactive,
    toRefs,
    unref,
  } from 'vue';
  import { useSimpleRootMenuContext } from '../useSimpleMenuContext';
  import { SubMenuProvider } from './types';
  import useMenuItem from './useMenu';
  import { useProviderContext } from '/@/components/Application';
  import Icon from '/@/components/Icon';
  import Mitt from '/@/utils/mitt';

  const DELAY = 200;

  export default defineComponent({
    name: 'SubMenu',
    props: {
      name: { type: [String, Number], required: true },
      disabled: Boolean,
      collapsedShowTitle: Boolean,
    },
    components: { Icon, Popover },
    setup(props) {
      const instance = getCurrentInstance(),
        subMenuEmitter = new Mitt(),
        data = reactive({
          timeout: null as TimeoutHandle | null,
          mouseInChild: false,
          isChild: false,
        }),
        state = reactive({ active: false, opened: false }),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('menu'),
        getClass = computed(() => [
          `${prefixCls}-submenu`,
          {
            [`${prefixCls}-item-active`]: state.active,
            [`${prefixCls}-opened`]: state.opened,
            [`${prefixCls}-submenu-disabled`]: props.disabled,
            [`${prefixCls}-submenu-has-parent-submenu`]: unref(getParentSubMenu),
            [`${prefixCls}-child-item-active`]: state.active,
          },
        ]);

      const { getParentSubMenu, getItemStyle, getParentMenu, getParentList } = useMenuItem(
          instance
        ),
        {
          addSubMenu: parentAddSubMenu,
          removeSubMenu: parentRemoveSubMenu,
          removeAll: parentRemoveAll,
          getOpenNames: parentGetOpenNames,
          isRemoveAllPopup,
          level,
          sliceIndex,
          props: rootProps,
          handleMouseleave: parentHandleMouseleave,
        } = inject<SubMenuProvider>(`subMenu:${getParentMenu.value?.uid}`)!,
        getAccordion = computed(() => rootProps.accordion),
        getCollapse = computed(() => rootProps.collapse),
        getTheme = computed(() => rootProps.theme),
        getOverlayStyle = computed((): CSSProperties => ({ minWidth: '200px' })),
        getIsOpened = computed(() => {
          if (unref(getCollapse)) return parentGetOpenNames().includes(props.name);
          return state.opened;
        }),
        getSubClass = computed(() => {
          const isActive = rootProps.activeSubMenuNames.includes(props.name);
          return [
            `${prefixCls}-submenu-title`,
            {
              [`${prefixCls}-submenu-active`]: isActive,
              [`${prefixCls}-submenu-active-border`]: isActive && level === 0,
              [`${prefixCls}-submenu-collapse`]: unref(getCollapse) && level === 0,
            },
          ];
        });
      const { rootMenuEmitter } = useSimpleRootMenuContext();
      function getEvents(deep: boolean) {
        if (!unref(getCollapse)) return {};
        return {
          onmouseenter: handleMouseenter,
        };
      }

      function handleClick() {
        if (props.disabled || unref(getCollapse)) return;
        const opened = state.opened;
        if (unref(getAccordion)) {
          const { uidList } = getParentList();
          rootMenuEmitter.emit('on-update-opened', {
            opened: false,
            parent: instance?.parent,
            uidList,
          });
          state.opened = !opened;
        }
      }

      function handleMouseenter() {
        if (props.disabled) return;
        subMenuEmitter.emit('submenu:mouse-enter-children');
        const index = parentGetOpenNames().findIndex((item) => item === props.name);
        sliceIndex(index);
        const isRoot = level === 0 && parentGetOpenNames().length === 2;
        if (isRoot) parentRemoveAll();
        data.isChild = parentGetOpenNames().includes(props.name);
        data.timeout && clearTimeout(data.timeout);
        data.timeout = setTimeout(() => {
          parentAddSubMenu(props.name);
          data.timeout = null;
        }, DELAY);
      }

      function handleMouseleave() {}
      return { getClass, handleClick, getCollapse, prefixCls, getItemStyle, ...toRefs(state) };
    },
  });
</script>

<style lang="less"></style>
