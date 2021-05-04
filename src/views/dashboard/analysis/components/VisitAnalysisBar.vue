<script lang="tsx">
  import { ref, onMounted } from 'vue';
  import { basicProps } from '/@/views/dashboard/analysis/components/props';
  import useEcharts from '/@/hooks/web/useEcharts';

  export default {
    name: 'VisitAnalysisBar',
    props: basicProps,
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useEcharts(chartRef);
      onMounted(() => {
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
          },
          yAxis: {
            type: 'value',
            max: 8000,
            splitNumber: 4,
          },
          series: [
            {
              data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
              type: 'bar',
              barMaxWidth: 80,
            },
          ],
        });
      });

      return () => <div ref={chartRef} style={props} />;
    },
  };
</script>
