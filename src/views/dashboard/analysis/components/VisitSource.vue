<template>
  <Card title="访问来源" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, watch, Ref, ref } from 'vue-demi';
  import { Card } from 'ant-design-vue';
  import useEcharts from '/@/hooks/web/useEcharts';

  export default defineComponent({
    name: 'VisitSource',
    components: { Card },
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '300px',
      },
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
            legend: { bottom: '1%', left: 'center' },
            series: [
              {
                color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2,
                },
                label: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '12',
                    fontWeight: 'bold',
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [
                  { value: 1048, name: '搜索引擎' },
                  { value: 735, name: '直接访问' },
                  { value: 580, name: '邮件营销' },
                  { value: 484, name: '联盟广告' },
                ],
                animationType: 'scale',
                animationEasing: 'exponentialInOut',
                animationDelay: function () {
                  return Math.random() * 100;
                },
              },
            ],
          });
        }
      );
      return { chartRef };
    },
  });
</script>
