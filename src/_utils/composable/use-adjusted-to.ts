import { inject, PropType, unref } from 'vue';
import { popoverBodyInjectionKey } from '/@/popover/src/interface';
import { useMemo } from 'vooks';

interface UseAdjustedToProps {
  to?: string | HTMLElement | boolean;
  [key: string]: unknown;
}
const teleportDisabled = '__disabled__';
export function useAdjustedTo(props: UseAdjustedToProps) {
  const popover = inject(popoverBodyInjectionKey, null);
  return useMemo(() => {
    const { to } = props;
    if (to !== undefined) {
      if (to === false) return teleportDisabled;
      if (to === true) return 'body';
      return to;
    }
    if (unref(popover)) return unref(popover);
    return to ?? 'body';
  });
}

useAdjustedTo.tdKey = teleportDisabled;

useAdjustedTo.propTo = {
  type: [String, Object, Boolean] as PropType<HTMLElement | string | boolean>,
  default: undefined,
};

export default useAdjustedTo;
