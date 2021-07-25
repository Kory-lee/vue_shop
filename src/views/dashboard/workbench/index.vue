<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /></template>
    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card :loading="loading" class="!my-4 enter-y">
          <img :src="illustrationImg" alt="" />
        </Card>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue-demi';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ProjectCard from './components/ProjectCard.vue';
  import DynamicInfo from './components/DynamicInfo.vue';
  import QuickNav from './components/QuickNav.vue';
  import { Card } from 'ant-design-vue';
  import illustrationImg from '/@/assets/svg/illustration.svg';

  export default defineComponent({
    name: 'Workbench',
    components: {
      QuickNav,
      DynamicInfo,
      ProjectCard,
      WorkbenchHeader,
      PageWrapper,
      Card,
    },
    setup() {
      const loading = ref(true);
      setTimeout(() => (loading.value = false), 1500);

      return {
        loading,
        illustrationImg,
      };
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
