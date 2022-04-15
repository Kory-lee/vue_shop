import { useSsrAdapter } from '@css-render/vue3-ssr';
import { hash } from 'css-render';
import { noop } from 'lodash-es';
import { ComputedRef, Ref, watchEffect, inject, ref, CSSProperties } from 'vue';
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider';
import { c } from '../_utils/cssr';
import { throwError } from '../_utils/ui/warn';

export default function useThemeClass(
  componentName: string,
  hashRef: Ref<string> | undefined,
  cssVarsRef: ComputedRef<Record<string, string> | CSSProperties> | undefined,
  props: { themeOverrides?: unknown; builtinThemeOverrides?: unknown }
) {
  if (!cssVarsRef) throwError('useThemeClass', 'cssVarsRef is not set');
  const mergedThemeHashRef = inject(configProviderInjectionKey, null)?.mergedThemeHashRef;
  const themeClassRef = ref('');
  const ssrAdapter = useSsrAdapter();

  const hashClassPrefix = `__${componentName}`;
  let renderCallback: () => void = noop;

  const mountStyle = (): void => {
    let finalThemeHash = hashClassPrefix;
    const hashValue = hashRef?.value;
    const themeHash = mergedThemeHashRef?.value;
    if (themeHash) finalThemeHash += '-' + themeHash;
    if (hashValue) finalThemeHash += '-' + hashValue;
    const { themeOverrides, builtinThemeOverrides } = props;
    if (themeOverrides) finalThemeHash += '-' + hash(JSON.stringify(themeOverrides));
    if (builtinThemeOverrides) finalThemeHash += '-' + hash(JSON.stringify(builtinThemeOverrides));
    themeClassRef.value = finalThemeHash;
    renderCallback = () => {
      const cssVars = cssVarsRef.value;
      let style = '';
      for (const key in cssVars) {
        style += `${key}: ${cssVars[key]};`;
      }
      c(`.${finalThemeHash}`, style).mount({
        id: finalThemeHash,
        ssr: ssrAdapter,
      });
      renderCallback = noop;
    };
  };
  watchEffect(mountStyle);
  return {
    themeClass: themeClassRef,
    onRender: renderCallback,
  };
}
