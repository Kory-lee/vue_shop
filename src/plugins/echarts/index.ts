import * as echarts from 'echarts/core';
import { LineChart, PieChart, MapChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';

echarts.use([LineChart, PieChart, MapChart, TitleComponent, TooltipComponent, GridComponent]);

export default echarts;
