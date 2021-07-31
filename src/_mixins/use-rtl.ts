import type { Ref } from 'vue';
import type { RtlEnabledState, RtlItem } from '/@/config-provider/src/internal-interface';

import { useSsrAdapter } from '@css-render/vue3-ssr';
import { computed, onBeforeMount, watchEffect } from 'vue';
import { exists } from 'css-render';

export default function useRtl(
  mountId: string,
  rtlStateRef: Ref<RtlEnabledState | undefined> | undefined,
  clsPrefixRef: Ref<string>
): Ref<RtlItem | undefined> | undefined {
  if (!rtlStateRef) return undefined;
  const ssrAdapter = useSsrAdapter();
  const componentRtlStateRef = computed(() => {
    const rtlState = rtlStateRef.value;
    if (!rtlState) return undefined;
    const componentRtlState = rtlState[mountId as keyof RtlEnabledState];
    if (!componentRtlState) return undefined;
    return componentRtlState;
  });
  const mountedStyle = (): void => {
    watchEffect(() => {
      const clsPrefix = clsPrefixRef.value;
      const id = `${clsPrefix}${mountId}Rtl`;
      if (exists(id)) return;
      const componentRtlState = componentRtlStateRef.value;
      componentRtlState?.style.mount({
        id,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined,
        },
        ssr: ssrAdapter,
      });
    });
  };
  if (ssrAdapter) mountedStyle();
  else onBeforeMount(mountedStyle);

  return componentRtlStateRef;
}
