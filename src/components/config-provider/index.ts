export const ConfigConsumerProps = {
  getPrefixCls(
    suffixCls: string,
    customizePrefixCls: string | null | undefined
  ) {
    if (customizePrefixCls) return customizePrefixCls;
    return `ant-${suffixCls}`;
  },
};
