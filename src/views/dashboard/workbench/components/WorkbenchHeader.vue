<template>
  <div class="lg:flex">
    <Avatar :src="logo" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 md:mt-0 mt-2 flex flex-col justify-center">
      <h1 class="md:text-lg text-md">早安, 开始您一天的工作吧</h1>
      <span class="text-secondary">今日晴🌤，20℃-32℃!</span>
    </div>
    <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
      <span class="text-secondary">项目</span>
      <span class="text-2xl">8</span>
    </div>
    <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
      <span class="text-secondary">团队 </span>
      <span class="text-2xl">300</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import logo from '/@/assets/img/logo.png';

  export default defineComponent({
    name: 'WorkbenchHeader',
    components: { Avatar },
    setup() {
      return { logo };
    },
  });
</script>
