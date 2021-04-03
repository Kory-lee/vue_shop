<template>
  <Provider :locale="getAntdLocale">
    <router-view />
  </Provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import 'windi.css';
  import { getAntdLocale } from './hooks/setting/useLocaleSetting';
  import { Provider } from '/@/components/Application';
  import { initConfigStore } from '/@/logics/init';

  export default defineComponent({
    name: 'App',
    components: { Provider },
    setup() {
      initConfigStore();

      return { getAntdLocale };
    },
  });
</script>
<style lang="less">
  @import './styles/index.less';
</style>
