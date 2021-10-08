<template>
  <Provider :locale="getAntdLocale">
    <router-view />
  </Provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Provider } from '/@/components/Application';
  import { initConfigStore } from '/@/logics/init';
  import { useLocale } from '/@/hooks/web/useLocale';
  import 'virtual:windi.css';
  import { useTitle } from '/@/hooks/web/useTitle';

  export default defineComponent({
    name: 'App',
    components: { Provider },
    setup() {
      initConfigStore();
      useTitle();
      const { getAntdLocale } = useLocale();

      return { getAntdLocale };
    },
  });
</script>
<style lang="less">
  @import './styles/index.less';
</style>
