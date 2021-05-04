<template>
  <SidebarTrigger v-if="sidebar" />
  <HeaderTrigger v-else :theme="theme" />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

  export default defineComponent({
    name: 'LayoutTrigger',
    components: {
      SidebarTrigger: createAsyncComponent(() => import('./sidebarTrigger.vue')),
      HeaderTrigger: createAsyncComponent(() => import('./headerTrigger.vue'), { loading: true }),
    },
    props: {
      sidebar: { type: Boolean, default: true },
      theme: { type: String as PropType<'light' | 'dark'>, default: 'light' },
    },
    setup() {},
  });
</script>
