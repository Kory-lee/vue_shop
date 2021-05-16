<template>
  <Card title="成交占比" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent, watch, Ref, ref } from 'vue-demi';
  import useEcharts from '/@/hooks/web/useEcharts';

  export default defineComponent({
    name: 'SalesProductPie',
    components: { Card },
    props: {
      width: { type: String, default: '100%' },
      height: { type: String, default: '300px' },
      loading: Boolean,
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useEcharts(chartRef as Ref<HTMLDivElement>);
      watch(
        () => props.loading,
        (val) => {
          if (val) return;
          setOptions({
            tooltip: { trigger: 'item' },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
                data: [
                  { value: 500, name: '电子产品' },
                  { value: 310, name: '服装' },
                  { value: 274, name: '化妆品' },
                  { value: 400, name: '家居' },
                ].sort((a, b) => a.value - b.value),
                roseType: 'radius',
                animationType: 'scale',
                animationEasing: 'exponentialInOut',
                animationDelay: () => Math.random() * 400,
              },
            ],
          });
        }
      );

      return { chartRef };
    },
  });
</script>
