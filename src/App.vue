<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view />
</template>

<script lang="ts">
import { Button as AButton } from "ant-design-vue";
import { ref } from "vue";
export default {
  name: "App",
  components: { AButton },
  setup() {
    const loading = ref(false);
    const handleClick = () => {
      console.log("1231");
      loading.value = !loading.value;
    };
    return { loading, handleClick };
  },
};
</script>
<style lang="less">
@import "./styles/index.less";
</style>
