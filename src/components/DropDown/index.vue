<script lang="ts">
import { Dropdown, Menu } from 'ant-design-vue';
import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import type { DropMenu } from './types';
import { Trigger } from '../DropDown/types';
//TODO Icon component
const Icon = h('i');
export default defineComponent({
  name: 'Dropdown',
  props: {
    trigger: { type: Array as PropType<string[]>, default: () => ['contextmenu'] },
    dropMenuList: { type: Array as PropType<DropMenu[]>, default: () => [] },
    selectedKeys: { type: Array as PropType<string[]>, default: () => [] },
  },
  emits: ['menuEvent'],
  setup(props, { emit, slots, attrs }) {
    const handleClickMenu = ({ key }: any) => {
      const menu = props.dropMenuList.find((item) => `${item.event}` === `${key}`);
      emit('menuEvent', menu);
    };
    const overlay = () =>
      h(
        Menu,
        { onClick: handleClickMenu, selectedKeys: props.selectedKeys },
        {
          default: () => {
            props.dropMenuList.map((item) => {
              const { disabled, icon, event, text, divider } = item;
              return [
                h(Menu.Item, { key: `${event}`, disabled }, [
                  icon && h(Icon, { icon }),
                  h('span', { class: 'ml-1' }, { default: () => text }),
                ]),
                divider && h(Menu.Divider, { key: `d-${event}` }),
              ];
            });
          },
        }
      );
    console.log(h('span'));

    return () =>
      h(
        Dropdown,
        { trigger: <Trigger[]>props.trigger, ...attrs },
        {
          default: () => {
            return h('span', slots?.default?.());
          },
          overlay,
        }
      );
  },
});
</script>

<style></style>
