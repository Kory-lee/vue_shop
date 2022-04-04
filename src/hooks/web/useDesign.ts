import { useProviderContext } from '/@/components/Application';

export function getPrefixCls(scope: string) {
  const { getPrefixCls } = useProviderContext();
  return getPrefixCls(scope);
}
