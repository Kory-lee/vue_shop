<template>
  <Header> header </Header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
export default defineComponent({
  name: 'LayoutHeader',
  components: { Header: Layout.Header },
  setup() {},
});
</script>

<style></style>
