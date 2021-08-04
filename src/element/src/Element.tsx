import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

import { computed, defineComponent } from 'vue';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';
import elementLight, { ElementTheme } from '/@/element/styles/light';
import { kebabCase } from 'lodash-es';

const elementProps = {
  ...(useTheme.props as ThemeProps<ElementTheme>),
  tag: { type: String, default: 'div' },
};
export type ElementProps = ExtractPublicPropTypes<typeof elementProps>;

export default defineComponent({
  name: 'Element',
  alias: ['El'],
  props: elementProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme(
      'Element',
      'Element',
      undefined,
      elementLight,
      props,
      mergedClsPrefixRef
    );
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const { common } = themeRef.value;
        return Object.keys(common).reduce((pre, key) => {
          pre[`--${kebabCase(key)}`] = common[key];
          return pre;
        }, {});
      }),
    };
  },
  render({ tag: Component }) {
    return (
      <Component role="none" class={`${this.mergedClsPrefix}-element`} style={this.cssVars}>
        {this.$slots}
      </Component>
    );
  },
});
