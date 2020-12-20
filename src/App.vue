<template>
  <Provider :locale="antConfigLocale">
    <router-view />
  </Provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Provider from '/@/components/Application/Provider/index';
import { antConfigLocaleRef as antConfigLocale } from '/@/hooks/web/useLocale';
import { getFullContent } from '/@/hooks/web/useFullContent';
export default defineComponent({
  name: 'App',
  components: { Provider },
  setup() {
    console.log(getFullContent);

    return { antConfigLocale };
  },
});
</script>
<style lang="less">
@import './styles/index.less';
</style>
