<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
import type { PropType } from 'vue';
import { getCollapsed, toggleCollapsed } from '/@/hooks/setting/menuSetting';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'HeaderTrigger',
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
  props: { type: String as PropType<'light' | 'dark'> },
  emits: ['click'],
  setup() {
    const getPrefixCls = inject('getPrefix', customizePrefixCls);

    return { prefixCls: getPrefixCls('layout-header-trigger'), toggleCollapsed, getCollapsed };
  },
});
</script>

<style></style>
