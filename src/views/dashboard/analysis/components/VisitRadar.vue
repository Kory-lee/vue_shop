<template>
  <Card title="转化率" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { ref, watch } from 'vue';
  import useEcharts from '/@/hooks/web/useEcharts';

  export default {
    name: 'VisitRadar',
    components: { Card },
    props: {
      loading: Boolean,
      width: { type: String, default: '100%' },
      height: { type: String, default: '300px' },
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      watch(
        () => props.loading,
        () => {
          const { setOptions } = useEcharts(chartRef);
          if (props.loading) {
            return;
          }
          setOptions({
            legend: {
              bottom: 0,
              data: ['访问', '购买'],
            },
            tooltip: {},
            radar: {
              radius: '60%',
              splitNumber: 8,
              indicator: [
                {
                  text: '电脑',
                  max: 100,
                },
                {
                  text: '充电器',
                  max: 100,
                },
                {
                  text: '耳机',
                  max: 100,
                },
                {
                  text: '手机',
                  max: 100,
                },
                {
                  text: 'Ipad',
                  max: 100,
                },
                {
                  text: '耳机',
                  max: 100,
                },
              ],
            },
            series: [
              {
                type: 'radar',
                symbolSize: 0,
                areaStyle: {
                  shadowBlur: 0,
                  shadowColor: 'rgba(0,0,0,.2)',
                  shadowOffsetX: 0,
                  shadowOffsetY: 10,
                  opacity: 1,
                },
                data: [
                  {
                    value: [90, 50, 86, 40, 50, 20],
                    name: '访问',
                    itemStyle: {
                      color: '#b6a2de',
                    },
                  },
                  {
                    value: [70, 75, 70, 76, 20, 85],
                    name: '购买',
                    itemStyle: {
                      color: '#5ab1ef',
                    },
                  },
                ],
              },
            ],
          });
        },
        { immediate: true }
      );

      return { chartRef };
    },
  };
</script>
