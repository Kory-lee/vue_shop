<template>
  <a-button>page</a-button>
  <test />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import test from "./test.vue";
export default defineComponent({
  components: { test },
});
</script>

<style lang="less"></style>
