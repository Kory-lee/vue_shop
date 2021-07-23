<template>
  <Provider :locale="getAntdLocale">
    <KConfigProvider abstract>
      <router-view />
    </KConfigProvider>
  </Provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Provider } from '/@/components/Application';
  import { initConfigStore } from '/@/logics/init';
  import { useLocale } from '/@/hooks/web/useLocale';
  import { KConfigProvider } from '/@/ui/config-provider';
  import 'virtual:windi.css';

  export default defineComponent({
    name: 'App',
    components: { Provider, KConfigProvider },
    setup() {
      initConfigStore();
      const { getAntdLocale } = useLocale();

      return { getAntdLocale };
    },
  });
</script>
<style lang="less">
  @import './styles/index.less';
</style>
