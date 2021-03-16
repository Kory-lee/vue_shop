<template>
  <Provider :locale="antConfigLocale">
    <router-view />
  </Provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import 'windi.css';
  import { Provider } from '/@/components/Application';
  import { antConfigLocaleRef as antConfigLocale, useLocale } from '/@/hooks/web/useLocale';
  import { initConfigStore } from '/@/logics/init';

  export default defineComponent({
    name: 'App',
    components: { Provider },
    setup() {
      useLocale();

      initConfigStore();

      return { antConfigLocale };
    },
  });
</script>
<style lang="less">
  @import './styles/index.less';
</style>
