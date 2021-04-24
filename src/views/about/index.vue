<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a href="#" target="_blank">{{ name }}</a>
          是一个基于Vue3,、Vite、Ant-Design-Vue、TypeScript的学习项目
        </span>
      </div>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';

  export default defineComponent({
    name: 'AboutPage',
    components: { PageWrapper },
    setup() {
      const { pkg } = __APP_INFO__;
      const { name } = pkg;
      console.log(pkg);
      return { name };
    },
  });
</script>

<style></style>
