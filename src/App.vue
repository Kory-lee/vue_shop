<template>
  <Provider :locale="'true'">
    <router-view />
  </Provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Provider from '/@/components/Application/Provider.vue';
export default defineComponent({
  name: 'App',
  components: { Provider },
});
</script>
<style lang="less">
@import './styles/index.less';
</style>
