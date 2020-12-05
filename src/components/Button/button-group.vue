<script lang="ts">
import { defineComponent, h, inject, PropType } from 'vue';
import { ConfigConsumerProps } from '../config-provider';
import { ButtonSizes } from './buttonTypes';
const ButtonGroupProps = {
  prefixCls: String,
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    validator: (value: string) => ['small', 'large', 'default'].includes(value),
    default: 'default',
  },
};
export default defineComponent({
  name: 'KoButtonGroup',
  props: ButtonGroupProps,
  setup(props, { slots }: any) {
    const configProvider = inject('configProvider', ConfigConsumerProps),
      getPrefixCls = configProvider.getPrefixCls,
      prefixCls = getPrefixCls('btn-group', props.prefixCls),
      size = ButtonSizes[props.size];

    const classes = { [`${prefixCls}`]: true, [`${prefixCls}-${size}`]: size };
    return () => h('div', { class: classes }, slots.default?.());
  },
});
</script>

<style lang="scss"></style>
