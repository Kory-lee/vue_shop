<template>
  <ConfigProvider :locale="locale">
    <slot></slot>
  </ConfigProvider>
</template>

<script lang="ts">
  import type { Locale } from 'ant-design-vue/lib/locale-provider';

  import { ConfigProvider } from 'ant-design-vue';
  import { defineComponent, PropType, readonly, ref } from 'vue';
  import { createProviderContext } from './useAppContext';
  import { createBreakpoint } from '/@/hooks/event/useBreakPoint';
  import styleSetting from '/@/settings/styleSetting';

  export default defineComponent({
    name: 'Provider',
    components: { ConfigProvider },
    props: {
      prefixCls: { type: String as PropType<string>, default: styleSetting.prefixCls },
      locale: { type: Object as PropType<Locale>, default: () => ({}) },
    },
    setup(props) {
      const isMobileRef = ref(false);
      createBreakpoint(({ width, sizeEnum, screenMap }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) isMobileRef.value = width.value - 1 < lgWidth;
      });
      const getPrefixCls = (scope?: string, customizePrefixCls?: string) => {
        const { prefixCls = styleSetting.prefixCls } = props;
        if (customizePrefixCls) return customizePrefixCls;
        return scope ? `${prefixCls}-${scope}` : prefixCls;
      };

      createProviderContext({ getPrefixCls, isMobile: readonly(isMobileRef) });
    },
  });
</script>
