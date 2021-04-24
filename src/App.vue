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

  export default defineComponent({
    name: 'App',
    components: { Provider },
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
