<template>
  <div ref="chartRef" :style="{ height, width }"> hello </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  export default defineComponent({
    props: {
      width: { type: String, default: '100%' },
      height: { type: String, default: 'calc(100vh - 78px)' },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);

      onMounted(() => {});
      return { chartRef };
    },
  });
</script>

<style></style>
