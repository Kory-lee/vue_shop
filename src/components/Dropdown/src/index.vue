<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span> <slot /> </span>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <template v-for="item in getMenuList" :key="`${item.event}`">
          <a-menu-item
            v-bind="getAttr(`${item.event}`)"
            @click="handleClickMenu(item)"
            :disabled="item.disabled"
          >
            <Icon :icon="item.icon" v-if="item.icon" />
            <span class="ml-1">{{ item.text }}</span>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { computed, defineComponent } from 'vue';
  import type { DropMenu } from './types';
  import Icon from '/@/components/Icon';

  export default defineComponent({
    name: 'Dropdown',
    props: {
      trigger: {
        type: [Array] as PropType<('click' | 'contextmenu' | 'hover')[]>,
        default: () => ['contextmenu'],
      },
      dropMenuList: { type: Array as PropType<DropMenu[]>, default: () => [] },
      selectedKeys: { type: Array as PropType<string[]>, default: () => [] },
      // ...Dropdown.props,
    },
    components: {
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.Divider.name]: Menu.Divider,
      Icon,
    },
    emits: ['menuEvent'],
    inheritAttrs: false,
    setup(props, { emit }) {
      const getMenuList = computed(() => props.dropMenuList);
      const handleClickMenu = (item: DropMenu) => {
        const { event } = item;
        const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
        emit('menuEvent', menu);
        item.onClick?.();
      };
      return {
        handleClickMenu,
        getMenuList,
        getAttr: (key: string) => ({ key }),
      };
    },
  });
</script>

<style></style>
