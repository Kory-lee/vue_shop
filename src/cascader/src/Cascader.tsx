import { defineComponent } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';

const cascaderProps = {
  ...useTheme.props,
};

export default defineComponent({
  name: 'Cascader',
  props: cascaderProps,
  setup(props) {
    const { mergedBorderedRef } = useConfig(props);

    return { mergedBordered: mergedBorderedRef };
  },
});
