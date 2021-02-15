<template>
  <div v-if="getMenuFixed && !isMobile" />
  <Sider ref="sideRef" breakpoint="lg" collapsible></Sider>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { getMenuFixed, getSplit } from '/@/hooks/setting/menuSetting';
  import { useProviderContext } from '/@/components/Application/Provider/useAppContext';
  import { MenuModeEnum } from '/@/enums/menuEnums';
  export default defineComponent({
    name: 'MaxSidebar',
    components: { Sider: Layout.Sider },
    setup() {
      const drageBarRef = ref<ElRef>(null),
        sideRef = ref<ElRef>(null),
        { isMobile, getPrefixCls } = useProviderContext(),
        getMode = computed(() => (unref(getSplit) ? MenuModeEnum.INLINE : null));
      return {
        sideRef,
        getMenuFixed,
        isMobile,
        prefixCls: getPrefixCls('layout-sidebar'),
        getMode,
      };
    },
  });
</script>

<style lang="ts"></style>
