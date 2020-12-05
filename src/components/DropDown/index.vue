<script lang="ts">
import { Dropdown, Menu } from 'ant-design-vue';
import { defineComponent, h } from 'vue';
import { basicDropdownProps } from './props';
export default defineComponent({
  name: 'Dropdown',
  props: basicDropdownProps,
  emits: ['menuEvent'],
  setup(props, { emit, slots }) {
    const handleClickMenu = ({ key }: any) => {
      const menu = props.dropMenuList.find((item) => `${item.event}` === `${key}`);
      emit('menuEvent', menu);
    };
    const overlay = () => h(Menu);
    console.log(h('span'));

    return () =>
      h(
        Dropdown,
        {},
        {
          default: () => {
            return h('span');
          },
          overlay,
        }
      );
  },
});
</script>

<style></style>
