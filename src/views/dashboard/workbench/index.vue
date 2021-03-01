<template>
  <a-row class="workbench p-4" :gutter="12">
    <a-col :md="24" :lg="17">
      <ProdTotal class="mb-3" />
      <TodoList class="mb-3" />
    </a-col>
    <a-col :md="24" :lg="7">
      <img :src="workImg" class="workbench__img mb-3" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { Col, Row } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import ProdTotal from './components/ProdTotal.vue';
  import TodoList from './components/TodoList.vue';
  import workImg from '/@/assets/img/dashboard/workbench/workbench.png';
  export default defineComponent({
    name: 'Workbench',
    components: { ProdTotal, TodoList, 'a-col': Col, 'a-row': Row },
    setup() {
      return { workImg };
    },
  });
</script>

<style lang="less">
  .workbench {
    &__img {
      width: 100%;
      height: 240px;
    }
  }
</style>
