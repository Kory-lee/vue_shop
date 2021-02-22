import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, h, PropType, readonly, ref } from 'vue';
import { createProviderContext } from './useAppContext';
import { createBreakpointListen } from '/@/hooks/event/breakPoint';
import styleSetting from '/@/settings/styleSetting';

export default defineComponent({
  name: 'Provider',
  inheritAttrs: false,
  components: { ConfigProvider },
  props: {
    prefixCls: { type: String as PropType<string>, default: styleSetting.prefixCls },
    // locale: ConfigProvider.props.locale,
    ...ConfigProvider.props,
  },
  setup(props, { attrs, slots }) {
    const isMobileRef = ref(false);
    createBreakpointListen(({ width, sizeEnum, screenMap }) => {
      const lgWidth = screenMap.get(sizeEnum.LG);
      if (lgWidth) isMobileRef.value = width.value - 1 < lgWidth;
    });
    const getPrefixCls = (scope?: string, customizePrefixCls?: string) => {
      const { prefixCls = styleSetting.prefixCls } = props;
      if (customizePrefixCls) return customizePrefixCls;
      return scope ? `${prefixCls}-${scope}` : prefixCls;
    };
    createProviderContext({ getPrefixCls, isMobile: readonly(isMobileRef) });
    return () => h(ConfigProvider, { ...attrs }, { default: () => slots.default?.() });
  },
});
