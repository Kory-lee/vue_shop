<template>
  <DoubleRightOutlined v-if="getCollapsed" />
  <DoubleLeftOutlined v-else />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { getCollapsed } from '../../../hooks/setting/MenuSetting';
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'SidebarTrigger',
    components: { DoubleRightOutlined, DoubleLeftOutlined },
    setup() {
      return { getCollapsed };
    },
  });
</script>

<style></style>
