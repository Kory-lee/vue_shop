import { PAGE_LAYOUT_COMPONENT } from "/@/router/constant";
import type { AppRouteModule } from "/@/router/types";

export default {
  layout: {
    path: "/charts",
    name: "Charts",
    component: PAGE_LAYOUT_COMPONENT,
    redirect: "/charts/apexChart",
    meta: { icon: "ant-design:area-chart-outlined", title: "图表库" },
  },
  routes: [],
} as AppRouteModule;
