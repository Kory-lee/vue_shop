import { defineComponent, renderSlot } from 'vue';

const buttonProps = {};

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup() {},
  render() {
    const Component = 'button';
    return (
      <Component>
        {this.$slots.default ? <div>{renderSlot(this.$slots, 'default')}</div> : null}
      </Component>
    );
  },
});
