<template>
  <MenuItem>
    <MenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>

<script lang="ts">
  import { Menu } from 'ant-design-vue';
  import { itemProps } from '../props';
  import { defineComponent } from 'vue';
  import { useProviderContext } from '/@/components/Application';
  import MenuItemContent from './MenuItemContent.vue';
  export default defineComponent({
    name: 'BaseicMenuItem',
    components: { MenuItem: Menu.Item, MenuItemContent },
    props: itemProps,
    setup() {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-menu-item');
      return { prefixCls };
    },
  });
</script>

<style></style>
