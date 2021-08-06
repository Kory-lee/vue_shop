import { defineComponent } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';
import { VBinder, VFollower, VTarget } from 'vueuc';

const cascaderProps = {
  ...useTheme.props,
};

export default defineComponent({
  name: 'Cascader',
  props: cascaderProps,
  setup(props) {
    const { mergedBorderedRef, mergedClsPrefixRef } = useConfig(props);

    return { mergedBordered: mergedBorderedRef, mergedClsPrefix: mergedClsPrefixRef };
  },
  render({ mergedClsPrefix }) {
    return (
      <div class={`${mergedClsPrefix}-cascader`}>
        <VBinder>
          {{
            default: () => [
              <VTarget>{}</VTarget>,
              <VFollower key="cascaderMenu" ref="cascaderMenuFollowRef">
                {}
              </VFollower>,
            ],
          }}
        </VBinder>
      </div>
    );
  },
});
