<template>
  <div ref="chartRef" :style="{ height, width }"> hello</div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import useEcharts from '/@/hooks/web/useEcharts';
  import { mapData } from '/@/views/demo/charts/data';
  import { registerMap } from 'echarts';
  import { GeoJSON } from 'echarts/types/src/coord/geo/geoTypes';

  export default defineComponent({
    props: {
      width: { type: String, default: '100%' },
      height: { type: String, default: 'calc(100vh - 78px)' },
    },
    setup() {
      const chartRef = ref();
      const { setOptions } = useEcharts(chartRef);

      onMounted(async () => {
        const json = (await import('./china.json')).default;

        registerMap('china', json as unknown as GeoJSON);
        setOptions({
          visualMap: [
            {
              min: 0,
              max: 1000,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: false,
              orient: 'horizontal',
              inRange: {
                color: ['#e0ffff', '#006edd'],
                symbolSize: [30, 100],
              },
            },
          ],
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          series: [
            {
              name: 'iphone',
              type: 'map',
              map: 'china',
              label: {
                show: true,
                color: 'rgb(249,249,249)',
                fontSize: 10,
              },
              itemStyle: {
                areaColor: '#2f82ce',
                borderColor: '#0DAAC1',
              },
              data: mapData,
            },
          ],
        });
      });
      return { chartRef };
    },
  });
</script>

<style></style>
