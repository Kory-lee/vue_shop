import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

import { computed, CSSProperties, defineComponent, PropType } from 'vue';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';
import style from './styles/index.cssr';
import { tableLight, TableTheme } from '/@/table/styles';
import { createKey } from '/@/_utils/cssr';

const tableProps = {
  ...(useTheme.props as ThemeProps<TableTheme>),
  bottomBordered: { type: Boolean, default: true },
  bordered: { type: Boolean, default: true },
  singleLine: { type: Boolean, default: true },
  singleColumn: { type: Boolean, default: false },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
};
export type TableProps = ExtractPublicPropTypes<typeof tableProps>;

export default defineComponent({
  name: 'Table',
  props: tableProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme('Table', 'Table', style, tableLight, props, mergedClsPrefixRef);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          self: {
            borderColor,
            borderColorModal,
            borderColorPopover,
            borderRadius,
            tdColor,
            tdColorModal,
            tdColorPopover,
            thColor,
            thColorModal,
            thColorPopover,
            tdTextColor,
            thTextColor,
            thFontWeight,
            lineHeight,
            [createKey('fontSize', props.size)]: fontSize,
            [createKey('tdPadding', props.size)]: tdPadding,
            [createKey('thPadding', props.size)]: thPadding,
          },
          common: { cubicBezierEaseInOut },
        } = themeRef.value;
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--border-color': borderColor,
          '--border-color-modal': borderColorModal,
          '--border-color-popover': borderColorPopover,
          '--border-radius': borderRadius,
          '--td-color': tdColor,
          '--td-color-modal': tdColorModal,
          '--td-color-popover': tdColorPopover,
          '--td-text-color': tdTextColor,
          '--th-color': thColor,
          '--th-color-modal': thColorModal,
          '--th-color-popover': thColorPopover,
          '--th-font-weight': thFontWeight,
          '--th-text-color': thTextColor,
          '--line-height': lineHeight,
          '--td-padding': tdPadding,
          '--th-padding': thPadding,
        };
      }),
    };
  },
  render() {
    return (
      <table
        class={[
          `${this.mergedClsPrefix}-table`,
          {
            [`${this.mergedClsPrefix}-table--bottom-bordered`]: this.bottomBordered,
            [`${this.mergedClsPrefix}-table--bordered`]: this.bordered,
            [`${this.mergedClsPrefix}-table--single-line`]: this.singleLine,
            [`${this.mergedClsPrefix}-table--single-column`]: this.singleColumn,
          },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </table>
    );
  },
});
