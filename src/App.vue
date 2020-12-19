<template>
  <Provider :locale="antConfigLocale">
    <router-view />
  </Provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Provider from '/@/components/Application/Provider/index';
import { useLocale } from '/@/hooks/web/useLocale';

export default defineComponent({
  name: 'App',
  components: { Provider },
  setup() {
    const { antConfigLocale } = useLocale();
    // console.log(antConfigLocale);
    return { antConfigLocale };
  },
});
</script>
<style lang="less">
@import './styles/index.less';
</style>
