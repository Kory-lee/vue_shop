import type { HLJSApi } from 'highlight.js';
import type { ComputedRef, Ref } from 'vue';

import { warn } from '../_utils';
import { computed, inject, watchEffect } from 'vue';
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider';

interface UseHljsProps {
  hljs?: unknown;
  [key: string]: unknown;
}

export interface Hljs {
  highlight: HLJSApi['highlight'];
  getLanguage: HLJSApi['getLanguage'];
}

export default function useHljs(
  props: UseHljsProps,
  shouldHighlightRef?: Ref<boolean>
): ComputedRef<Hljs | undefined> {
  const ConfigProvider = inject(configProviderInjectionKey, null);
  if (__IS_DEV__) {
    const wranHljs = () => {
      if (!props.hljs && !ConfigProvider?.mergedHljsRef.value) {
        warn('code', 'hljs is not set');
      }
    };
    if (!shouldHighlightRef) {
      wranHljs();
    } else {
      watchEffect(() => shouldHighlightRef.value && wranHljs());
    }
  }

  return computed(() => (props.hljs as any) || ConfigProvider?.mergedHljsRef.value);
}
