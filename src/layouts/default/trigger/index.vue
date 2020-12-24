<template>
  <SidebarTrigger v-if="sidebar" />
  <HeaderTrigger v-else :theme="theme" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

export default defineComponent({
  name: 'LayoutTrigger',
  props: {
    sidebar: { type: Boolean, default: true },
    theme: { type: String as PropType<'light' | 'dark'> },
  },
  components: {
    SidebarTrigger: createAsyncComponent(() => import('./sidebarTrigger.vue')),
    HeaderTrigger: createAsyncComponent(() => import('./headerTrigger.vue'), { loading: true }),
  },
  setup() {},
});
</script>

<style></style>
