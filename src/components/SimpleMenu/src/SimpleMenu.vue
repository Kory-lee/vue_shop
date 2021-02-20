<template>
  <Menu
    :activeName="activeName"
    :openNames="getOpenKeys"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
  ></Menu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, reactive, ref, toRefs, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProviderContext } from '../../Application';
  import Menu from './components/Menu.vue';
  import { SimpleMenuState } from './types';
  import useOpenKeys from './useOpenKeys';
  import { Menu as MenuType } from '/@/router/types';
  export default defineComponent({
    name: 'SimpleMenu',
    components: { Menu },
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
      // TODO
      const getBindValues = computed(() => ({ ...attrs, ...props }));
      console.log(getBindValues);

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) menuState.openNames = [];
          else setOpenKeys(currentRoute.value.path);
        },
        { immediate: true }
      );
      return { prefixCls, getOpenKeys, ...toRefs(menuState) };
    },
  });
</script>

<style></style>
