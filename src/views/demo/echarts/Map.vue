<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from '@vue/runtime-core';

  export default defineComponent({
    props: {
      width: { type: String, default: '100%' },
      height: { type: String, default: 'calc(100vh - 78px)' },
    },
    setup() {
      const chartRef = <HTMLDivElement | null>ref(null);

      onMounted(() => {});
    },
  });
</script>

<style></style>
