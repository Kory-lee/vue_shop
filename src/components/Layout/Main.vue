<template>
  <el-card>
    <template #header><slot name="top"></slot></template>
    <slot>el-card</slot>
  </el-card>
</template>

<script>
export default {
  name: 'Main',
  setup() {
    return {};
  },
};
</script>

<style></style>
