import { defineComponent, PropType } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import useConfig from '/@/_mixins/use-config';

const dividerProps = {
  ...useTheme.props,
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

    return {
      mergedClsPrefix: mergedClsPrefixRef,
    };
  },
  render() {
    return <div></div>;
  },
});
