<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>

<script lang="ts">
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import { useProviderContext } from '/@/components/Application';
  import { getCollapsed, toggleCollapsed } from '/@/hooks/setting/useMenuSetting';
  export default defineComponent({
    name: 'HeaderTrigger',
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
    props: { theme: { type: String as PropType<'light' | 'dark'> } },
    emits: ['click'],
    setup() {
      const { getPrefixCls } = useProviderContext();

      return { prefixCls: getPrefixCls('layout-header-trigger'), toggleCollapsed, getCollapsed };
    },
  });
</script>
