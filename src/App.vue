<template>
  <Provider :locale="getAntdLocale">
    <router-view />
    <ModalContainer />
  </Provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Provider } from '/@/components/Application';
  import { initConfigStore } from '/@/logics/init';
  import { useLocale } from '/@/hooks/web/useLocale';
  // import 'virtual:windi.css';
  import { useTitle } from '/@/hooks/web/useTitle';
  import 'dayjs/locale/zh-cn';
  import 'virtual:windi-base.css';
  import 'virtual:windi-components.css';
  import 'virtual:windi-utilities.css';
  import 'virtual:svg-icons-register';
  import { ModalContainer } from './components/Modal';

  export default defineComponent({
    name: 'App',
    components: { Provider, ModalContainer },
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
