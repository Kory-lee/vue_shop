import { computed, CSSProperties, defineComponent, Fragment, PropType } from 'vue';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';
import style from './styles/index.cssr';
import { dividerLight, DividerTheme } from '/@/divider/styles';

const dividerProps = {
  ...(useTheme.props as ThemeProps<DividerTheme>),
  titlePlacement: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  dashed: Boolean,
  vertical: Boolean,
};

export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme('Divider', 'Divider', style, dividerLight, props, mergedClsPrefixRef);

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor, fontWeight },
        } = themeRef.value;
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor,
          '--font-weight': fontWeight,
        };
      }),
    };
  },
  render() {
    return (
      <div
        role="separator"
        class={[
          `${this.mergedClsPrefix}-divider`,
          {
            [`${this.mergedClsPrefix}-divider--vertical`]: this.vertical,
            [`${this.mergedClsPrefix}-divider--no-title`]: !this.$slots.default,
            [`${this.mergedClsPrefix}-divider--dashed`]: this.dashed,
            [`${this.mergedClsPrefix}-divider--title-position-${this.titlePlacement}`]:
              this.titlePlacement && this.$slots.default,
          },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {!this.vertical ? (
          <div
            class={`${this.mergedClsPrefix}-divider__line ${this.mergedClsPrefix}-divider__line--left`}
          />
        ) : null}
        {!this.vertical && this.$slots.default ? (
          <Fragment>
            <div class={`${this.mergedClsPrefix}-divider__title`}>{this.$slots}</div>
            <div
              class={`${this.mergedClsPrefix}-divider__line ${this.mergedClsPrefix}-divider__line--right`}
            />
          </Fragment>
        ) : null}
      </div>
    );
  },
});
