import { CNode } from 'css-render';
import { onBeforeMount, Ref, unref } from 'vue';
import { useSsrAdapter } from '@css-render/vue3-ssr';
import globalStyle from '../_styles/global/index.cssr';

export default function useStyle(
  mountId: string,
  style: CNode,
  clsPrefixRef?: Ref<string | undefined>
) {
  if (!style) {
    if (__DEV__) throw new Error('use-style no style');
  }
  const ssrAdapter = useSsrAdapter();
  const mountStyle = (): void => {};
  const clsPrefix = unref(clsPrefixRef);
  style.mount({
    id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
    head: true,
    props: { bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined },
    ssr: ssrAdapter,
  });
  globalStyle.mount({
    id: 'naive-ui/global',
    head: true,
    ssr: ssrAdapter,
  });
  if (ssrAdapter) mountStyle();
  else onBeforeMount(mountStyle);
}
