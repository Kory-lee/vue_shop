import { spaceLight, SpaceTheme } from '../styles';

import { computed, CSSProperties, defineComponent, ExtractDefaultPropTypes, PropType } from 'vue';
import useTheme, { ThemeProps } from '../../_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';
import { createKey } from '/@/_utils/cssr';
import { depx, getGap } from 'seemly';
import { flatten } from '/@/_utils/vue/flatten';
import getSlot from '../../_utils/vue/getSlot';

type Align = 'stretch' | 'baseline' | 'start' | 'end' | 'enter' | 'flex-end' | 'flex-start';

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

const spaceProps = {
  ...(useTheme.props as ThemeProps<SpaceTheme>),
  align: String as PropType<Align>,
  justify: {
    type: String as PropType<Justify>,
    default: 'start',
  },
  inline: Boolean,
  vertical: Boolean,
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | number | [number, number]>,
    default: 'medium',
  },
  itemStyle: [String, Object] as PropType<string | CSSProperties>,
  wrap: { type: Boolean, default: true },
} as const;

export type SpaceProps = ExtractDefaultPropTypes<typeof spaceProps>;

export default defineComponent({
  name: 'Space',
  props: spaceProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme('Space', 'Space', undefined, spaceLight, props, mergedClsPrefixRef);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      margin: computed<{ horizontal: number; vertical: number }>(() => {
        const { size } = props;
        if (Array.isArray(size)) return { horizontal: size[0], vertical: size[1] };
        if (typeof size === 'number') return { horizontal: size, vertical: size };
        const {
          self: { [createKey('gap', size)]: gap },
        } = themeRef.value;
        const { row, col } = getGap(gap);
        return { horizontal: depx(col), vertical: depx(row) };
      }),
    };
  },
  render() {
    const { mergedClsPrefix, justify, margin, vertical, inline, wrap, align } = this;
    const children = flatten(getSlot(this.$slots));
    const horizontalMargin = `${margin.horizontal}px`;
    const semiHorizontalMargin = `${margin.horizontal / 2}px`;
    const verticalMargin = `${margin.vertical}px`;
    const semiVerticalMargin = `${margin.vertical / 2}px`;
    const lastIndex = children.length - 1;
    const isJustifySpace = justify.startsWith('space-');

    return (
      <div
        role="none"
        class={`${mergedClsPrefix}-space`}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: vertical ? 'column' : 'row',
          justifyContent: ['start', 'end'].includes(justify) ? `flex-${justify}` : justify,
          flexWrap: !wrap || vertical ? 'nowrap' : 'wrap',
          marginTop: vertical ? '' : `-${semiVerticalMargin}`,
          marginBottom: vertical ? '' : `-${semiVerticalMargin}`,
          alignItems: align,
        }}
      >
        {children.map((child, index) => (
          <div
            role="none"
            style={[
              this.itemStyle as any,
              { maxWidth: '100%' },
              vertical
                ? {
                    marginBottom: index !== lastIndex ? verticalMargin : '',
                  }
                : {
                    marginRight: isJustifySpace
                      ? justify === 'space-between' && index == lastIndex
                        ? ''
                        : semiHorizontalMargin
                      : index !== lastIndex
                      ? horizontalMargin
                      : '',
                    marginLeft: isJustifySpace
                      ? justify === 'space-between' && index === 0
                        ? ''
                        : semiHorizontalMargin
                      : '',
                    paddingTop: semiVerticalMargin,
                    paddingBottom: semiVerticalMargin,
                  },
            ]}
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
});
