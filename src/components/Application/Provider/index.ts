import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, h, PropType, provide, readonly, ref } from 'vue';
// import {createBreakpointListen} from '/@/hooks/event'
import styleSetting from '/@/settings/styleSetting';

export const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;
  return `${styleSetting.prefixCls}-${suffixCls}`;
};

export default defineComponent({
  name: 'Provider',
  inheritAttrs: false,
  components: { ConfigProvider },
  props: {
    prefixCls: { type: String as PropType<string>, default: styleSetting.prefixCls },
  },
  setup(props, { attrs, slots }) {
    const isMobileRef = ref(false);
    const getPrefixCls = (scope?: string, customizePrefixCls?: string) => {
      const { prefixCls = styleSetting.prefixCls } = props;
      if (customizePrefixCls) return customizePrefixCls;
      return scope ? `${prefixCls}-${scope}` : prefixCls;
    };
    provide('isMobile', readonly(isMobileRef));
    provide('getPrefixCls', getPrefixCls);

    return () => h(ConfigProvider, { ...attrs }, { default: () => slots.default?.() });
  },
});
