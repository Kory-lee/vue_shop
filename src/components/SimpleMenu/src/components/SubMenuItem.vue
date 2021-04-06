<template>
  <li :class="getClass">
    <template v-if="!getCollapse">
      <div :class="`${prefixCls}-submenu-title`" :style="getItemStyle" @click.stop="handleClick">
        <slot name="title" />
        <Icon
          icon="eva:arrow-ios-downward-outline"
          :size="14"
          :class="`${prefixCls}-submenu-title-icon`"
        />
      </div>
      <ul v-show="opened" :class="prefixCls">
        <slot />
      </ul>
    </template>
    <Popover
      v-else
      :overlay-class-name="`${prefixCls}-menu-popover`"
      :visible="getIsOpened"
      :overlay-style="getOverlayStyle"
      :align="{ offset: [0, 0] }"
      placement="right"
      @visible-change="handleVisibleChange"
    >
      <div :class="getSubClass" v-bind="getEvents(false)">
        <div
          :class="{
            [`${prefixCls}-submenu-popup`]: !getParentSubMenu,
            [`${prefixCls}-submenu-collapsed-show-title`]: collapsedShowTitle,
          }"
        >
          <slot name="title" />
        </div>
        <Icon
          v-if="getParentSubMenu"
          :size="14"
          icon="eva:arrow-ios-downward-outline"
          :class="`${prefixCls}-submenu-title-icon`"
        />
      </div>
      <template #content>
        <div v-show="opened" v-bind="getEvents(true)">
          <ul :class="[prefixCls, `${prefixCls}-${getTheme}`, `${prefixCls}-popup`]">
            <slot />
          </ul>
        </div>
      </template>
    </Popover>
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
    onBeforeMount,
    provide,
    reactive,
    toRefs,
    unref,
  } from 'vue';
  import { useSimpleRootMenuContext } from '../useSimpleMenuContext';
  import { SubMenuProvider } from './types';
  import useMenuItem from './useMenu';
  import { useProviderContext } from '/@/components/Application';
  import Icon from '/@/components/Icon';
  import { isArray, isBoolean, isObject } from '/@/utils/is';
  import Mitt from '/@/utils/mitt';

  const DELAY = 200;

  export default defineComponent({
    name: 'SubMenu',
    components: { Icon, Popover },
    props: {
      name: { type: [String, Number], required: true },
      disabled: Boolean,
      collapsedShowTitle: Boolean,
    },
    setup(props) {
      const { rootMenuEmitter } = useSimpleRootMenuContext(),
        instance = getCurrentInstance(),
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

      function getEvents(deep: boolean) {
        if (!unref(getCollapse)) return {};
        return {
          onMouseenter: handleMouseenter,
          onMouseleave: () => handleMouseleave(deep),
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
        subMenuEmitter.emit('submenu:mouse-enter-child');
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

      function handleMouseleave(deepDispatch = false) {
        const parentName = getParentMenu.value?.props.name;
        if (!parentName) isRemoveAllPopup.value = true;
        if (parentGetOpenNames().slice(-1)[0]) data.isChild = false;

        subMenuEmitter.emit('submenu:mouse-leave-child');
        if (data.timeout) {
          clearTimeout(data.timeout);
          data.timeout = setTimeout(() => {
            if (isRemoveAllPopup.value) parentRemoveAll();
            else if (!data.mouseInChild) parentRemoveSubMenu(props.name);
          }, DELAY);
        }
        if (deepDispatch && getParentSubMenu.value) parentHandleMouseleave?.(true);
      }
      function handleVisibleChange(visible: boolean) {
        state.opened = visible;
      }
      onBeforeMount(() => {
        subMenuEmitter.on('submenu:mouse-enter-child', () => {
          data.mouseInChild = true;
          isRemoveAllPopup.value = false;
          clearTimeout(data.timeout!);
        });

        subMenuEmitter.on('submenu:mouse-leave-child', () => {
          if (data.isChild) return;
          data.mouseInChild = false;
          clearTimeout(data.timeout!);
        });

        rootMenuEmitter.on(
          'on-updata-opened',
          (data: boolean | (string | number)[] | Recordable) => {
            if (unref(getCollapse)) return;
            if (isBoolean(data)) {
              state.opened = data;
              return;
            }
            if (isObject(data)) {
              const { opened, parent, uidList } = data as Recordable;
              if (parent === instance?.parent) state.opened = opened;
              else if (!uidList.includes(instance?.uid)) state.opened = false;
              return;
            }
            if (props.name && isArray(data)) {
              state.opened = (data as (string | number)[]).includes(props.name);
            }
          }
        );

        rootMenuEmitter.on('on-update-active-name:submenu', (data: number[]) => {
          if (instance?.uid) state.active = data.includes(instance?.uid);
        });
      });

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        addSubMenu: parentAddSubMenu,
        removeSubMenu: parentRemoveSubMenu,
        getOpenNames: parentGetOpenNames,
        removeAll: parentRemoveAll,
        isRemoveAllPopup,
        sliceIndex,
        level: level + 1,
        handleMouseleave,
        props: rootProps,
      });

      return {
        getClass,
        getSubClass,
        handleClick,
        handleVisibleChange,
        getCollapse,
        prefixCls,
        getEvents,
        getItemStyle,
        getOverlayStyle,
        getTheme,
        getIsOpened,
        getParentSubMenu,
        ...toRefs(state),
        ...toRefs(data),
      };
    },
  });
</script>

<style lang="less"></style>
