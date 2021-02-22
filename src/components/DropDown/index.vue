<template>
  <DropDown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <Menu :selectedKeys="selectedKeys">
        <template v-for="item in getMenuList" :key="`${item.event}`">
          <MenuItem
            v-bind="getAttr(`${item.event}`)"
            @click="handleClickMenu(item)"
            :disabled="item.disabled"
          >
            <Icon :icon="item.icon" v-if="item.icon" />
            <span class="ml-1">{{ item.text }}</span>
          </MenuItem>
          <MenuDivider v-if="item.divider" :key="`d-${item.event}`"> </MenuDivider>
        </template>
      </Menu>
    </template>
  </DropDown>
</template>
<script lang="ts">
  import { Dropdown, Menu } from 'ant-design-vue';

  import Icon from '../Icon';
  import { computed, defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import type { DropMenu } from './types';

  export default defineComponent({
    name: 'Dropdown',
    props: {
      trigger: { type: Array as PropType<string[]>, default: () => ['contextmenu'] },
      dropMenuList: { type: Array as PropType<DropMenu[]>, default: () => [] },
      selectedKeys: { type: Array as PropType<string[]>, default: () => [] },
    },
    components: { Dropdown, Menu, MenuItem: Menu.Item, MenuDivider: Menu.Divider, Icon },
    emits: ['menuEvent'],
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
