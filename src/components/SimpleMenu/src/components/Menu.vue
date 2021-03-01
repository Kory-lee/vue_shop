<template>
  <ul :class="getClass">
    <slot />
  </ul>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    PropType,
    provide,
    ref,
    watch,
    watchEffect,
  } from 'vue';
  import { useSimpleRootMenuContext } from '../useSimpleMenuContext';
  import { SubMenuProvider } from './types';
  import { useProviderContext } from '/@/components/Application';

  export default defineComponent({
    name: 'Menu',
    props: {
      theme: { type: String as PropType<'light' | 'dark'>, default: 'light' },
      activeName: [String, Number],
      openNames: { type: Array as PropType<string[]>, default: () => [] },
      accordion: { type: Boolean, default: true },
      width: { type: String, default: '100%' },
      collapsedWidth: { type: String, default: '48px' },
      indentSize: { type: Number, default: 16 },
      collapse: { type: Boolean, default: true },
      activeSubMenuNames: { type: Array as PropType<(string | number)[]>, default: () => [] },
    },
    emits: ['select', 'open-change'],
    setup(props, { emit }) {
      const instance = getCurrentInstance(),
        { rootMenuEmitter, activeName: currentActiveName } = useSimpleRootMenuContext(),
        openedNames = ref<string[]>([]),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('menu'),
        isRemoveAllPopup = ref(false);

      const getClass = computed(() => [
        prefixCls,
        `${prefixCls}-${props.theme}`,
        `${prefixCls}-vertical`,
        {
          [`${prefixCls}-collapse`]: props.collapse,
        },
      ]);
      watchEffect(() => (openedNames.value = props.openNames));
      watchEffect(() => {
        if (props.activeName) currentActiveName.value = props.activeName;
      });

      watch(
        () => props.openNames,
        () => nextTick(() => updateOpened())
      );

      function updateOpened() {
        rootMenuEmitter.emit('on-update-opened', openedNames);
      }

      function addSubMenu(name: string) {
        if (openedNames.value.includes(name)) return;
        openedNames.value.push(name);
        updateOpened();
      }

      function removeSubMenu(name: string) {
        openedNames.value = openedNames.value.filter((item) => item !== name);
        updateOpened();
      }

      function removeAll() {
        openedNames.value = [];
        updateOpened();
      }
      function sliceIndex(index: number) {
        if (index === -1) return;
        openedNames.value = openedNames.value.slice(0, index + 1);
        updateOpened();
      }

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        addSubMenu,
        removeSubMenu,
        getOpenNames: () => openedNames.value,
        removeAll,
        isRemoveAllPopup,
        sliceIndex,
        level: 0,
        props,
      });

      onMounted(() => {
        openedNames.value = !props.collapse ? [...props.openNames] : [];
        updateOpened();
        rootMenuEmitter.on('on-menu-item-select', (name: string) => {
          currentActiveName.value = name;
          nextTick(() => props.collapse);
          emit('select', name);
        });
      });
      return { getClass };
    },
  });
</script>

<style lang="less">
  @import './menu';
</style>
