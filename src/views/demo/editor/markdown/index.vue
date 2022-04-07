<template>
  <page-wrapper title="Markdown组件示例">
    <div>
      <Markdown />
    </div>
  </page-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import { PageWrapper } from '/@/components/Page';
  import { Markdown } from '/@/components/Markdown';

  export default defineComponent({
    components: { PageWrapper, Markdown },
  });
</script>

<style></style>
