<template>
  <MenuItem>
    <span class="flex items-center">
      <Icon v-if="icon" :icon="icon" class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </MenuItem>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';
  import Icon from '/@/components/Icon';
  import { Menu } from 'ant-design-vue';
  export default defineComponent({
    name: 'UserDropdownMneuItem',
    components: { MenuItem: Menu.Item, Icon },
    props: {
      key: { type: String, required: true },
      text: { type: String, default: '' },
      icon: { type: String, default: '' },
    },
  });
</script>
