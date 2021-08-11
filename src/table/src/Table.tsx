import { defineComponent } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';
import useConfig from '/@/_mixins/use-config';

const tableProps = {
  ...useTheme.props,
  bottomBordered: { type: Boolean, default: true },
  bordered: { type: Boolean, default: true },
};
export type TableProps = ExtractPublicPropTypes<typeof tableProps>;

export default defineComponent({
  name: 'Table',
  props: tableProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    return { mergedClsPrefix: mergedClsPrefixRef };
  },
  render() {
    return (
      <table
        class={[
          `${this.mergedClsPrefix}-table`,
          {
            [`${this.mergedClsPrefix}-table--bottom-bordered`]: this.bottomBordered,
            [`${this.mergedClsPrefix}-table--bordered`]: this.bordered,
          },
        ]}
      >
        {this.$slots}
      </table>
    );
  },
});
