import { defineComponent, PropType, CSSProperties, computed } from 'vue';
import { codeLight, CodeTheme } from '../styles';
import useConfig from '/@/_mixins/use-config';
import { Hljs } from '/@/_mixins/use-hljs';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import style from './styles/index.cssr';

const codeProps = {
  ...(useTheme.props as ThemeProps<CodeTheme>),
  code: {
    type: String,
    default: '',
  },
  trim: {
    type: Boolean,
    default: true,
  },
  hljs: Object as PropType<Hljs>,
  uri: {
    type: Boolean,
    default: false,
  },
  internalNoHighlight: Boolean,
};

export default defineComponent({
  name: 'Code',
  props: codeProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig();

    const themeRef = useTheme('Code', 'Code', style, codeLight, props, mergedClsPrefixRef);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut, fontFamilyMono },
          self: {
            textColor,
            fontSize,
            fontWeightStrong,
            // extracted from hljs atom-one-light.scss
            'mono-3': $1,
            'hue-1': $2,
            'hue-2': $3,
            'hue-3': $4,
            'hue-4': $5,
            'hue-5': $6,
            'hue-5-2': $7,
            'hue-6': $8,
            'hue-6-2': $9,
          },
        } = themeRef.value;
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-family': fontFamilyMono,
          '--font-size': fontSize,
          '--font-weight-strong': fontWeightStrong,
          '--textColor': textColor,
          '--mono-3': $1,
          '--hue-1': $2,
          '--hue-2': $3,
          '--hue-3': $4,
          '--hue-4': $5,
          '--hue-5': $6,
          '--hue-5-2': $7,
          '--hue-6': $8,
          '--hue-6-2': $9,
        } as CSSProperties;
      }),
    };
  },
  render() {
    return (
      <code class={`${this.mergedClsPrefix}-code`} style={this.cssVars}>
        {this.$slots.default?.() ?? <pre ref="codeRef"></pre>}
      </code>
    );
  },
});
