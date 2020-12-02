import { defineComponent, provide } from 'vue';

const ConfigProvider = defineComponent({
  name: 'AConfigProvider',
  props: {
    getPopupContainer: Function,
    prefixCls: String,
    renderEmpty: Function,
  },
  setup(props) {
    provide('configProvider', {
      ...props,
      getPrefixCls(suffixCls: string, customizePrefixCls: string | null | undefined) {
        const { prefixCls = 'ant' } = props;
        if (customizePrefixCls) return customizePrefixCls;
        return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
      },
    });
  },
});
export const ConfigConsumerProps = {
  getPrefixCls(suffixCls: string, customizePrefixCls: string | null | undefined) {
    if (customizePrefixCls) return customizePrefixCls;
    return `ant-${suffixCls}`;
  },
};
