<template>
  <PageWrapper
    content="目前mock了两组数据， id为1 和 2 具体返回的菜单可以在mock/sys/menu.ts内查看"
    content-background
    content-class="p-4"
    title="后台权限示例"
  >
    <CurrentPermissionMode />
    <Alert class="mt-4" message="点击后请查看左侧菜单变化" show-icon type="info" />

    <div class="mt-4">
      <span> 权限切换(请先切换权限模式为后台权限模式):</span>
    </div>
  </PageWrapper>
</template>

<script>
  import { PageWrapper } from '/@/components/Page';
  import CurrentPermissionMode from '../CurrentPermissionMode.vue';
  import { Alert } from 'ant-design-vue';

  export default {
    name: 'Back',
    components: { CurrentPermissionMode, PageWrapper, Alert },
    setup() {},
  };
</script>

<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
