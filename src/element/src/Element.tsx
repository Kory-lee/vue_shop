import { defineComponent } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';
import useConfig from '/@/_mixins/use-config';

const elementProps = {
  ...useTheme.props,
  tag: { type: String, default: 'div' },
};
export type ElementProps = ExtractPublicPropTypes<typeof elementProps>;

export default defineComponent({
  name: 'Element',
  alias: ['El'],
  props: elementProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    return { mergedClsPrefix: mergedClsPrefixRef };
  },
  render({ tag: Component }) {
    return (
      <Component role="none" class={`${this.mergedClsPrefix}-element`}>
        {this.$slots}
      </Component>
    );
  },
});
