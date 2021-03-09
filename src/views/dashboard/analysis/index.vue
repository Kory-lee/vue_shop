<template>
  <div class="p-4 analysis"
    >analysis
    <Row class="pl-2">
      <!-- <template> </template> -->
    </Row>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';
  import { Row, Col } from 'ant-design-vue';
  export default defineComponent({
    components: { Row, Col },
    name: 'Analysis',
    setup() {
      console.log('ana');
    },
  });
</script>

<style lang="less"></style>
