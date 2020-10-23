<template>
  <a-row class="workbench p-4" :gutter="12">
    <a-col></a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Row as ARow, Col as ACol } from "ant-design-vue";
export default defineComponent({
  name: "Workbench",
  components: { ARow, ACol },
  setup() {},
});
</script>
<style lang="less" scoped></style>
