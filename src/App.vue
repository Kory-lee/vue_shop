<template>
  <router-view />
  <ko-button>hello</ko-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style lang="less">
@import "./styles/index.less";
</style>
