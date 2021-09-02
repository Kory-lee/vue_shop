import { computed, defineComponent, mergeProps, ref, unref } from 'vue';
import Popover, { popoverBaseProps } from '/@/popover/src/Popover';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';
import tooltipLight, { TooltipTheme } from '/@/tooltip/styles/light';
import type { PopoverInst } from '/@/popover';

const tooltipProps = {
  ...popoverBaseProps,
  ...(useTheme.props as ThemeProps<TooltipTheme>),
};
export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>;

export default defineComponent({
  name: 'ToolTip',
  props: tooltipProps,
  setup(props) {
    const themeRef = useTheme('Tooltip', 'Tooltip', undefined, tooltipLight, props);
    const popoverRef = ref<PopoverInst | null>(null);

    return {
      ...unref(popoverRef),
      popoverRef,
      mergedTheme: themeRef,
      popoverThemeOverrides: computed(() => unref(themeRef).self),
    };
  },
  render({ internalExtraClass, mergedTheme }) {
    return (
      <Popover
        {...mergeProps(this.$props, {
          theme: mergedTheme.peers.Popover,
          themeOverrides: mergedTheme.peerOverrides.Popover,
          builtinThemeOverrides: this.popoverThemeOverrides,
          internalExtraClass: internalExtraClass.concat('tooltip'),
          ref: 'popoverRef',
        })}
      >
        {this.$slots}
      </Popover>
    );
  },
});
