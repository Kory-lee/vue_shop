<template>
  <PageWrapper title="表单基础示例">
    <KInput type="textarea" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { KInput } from '/@/ui/input';

  export default defineComponent({
    components: { PageWrapper, KInput },
  });
</script>
