<!--TODO 为什么用模板语法会报错呢-->
<template>
  <AFooter>
    <div>Copyright &copy;2020 Admin</div>
  </AFooter>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { Layout } from 'ant-design-vue';
export default defineComponent({
  name: 'LayoutFooter',
  components: { AFooter: Layout.Footer },
  setup() {},
});
</script>

<style lang="ts"></style>
