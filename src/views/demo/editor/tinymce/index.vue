<template>
  <PageWrapper title="富文本组件示例">
    <Tinymce v-model="value" @change="handleChange" width="100%" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue-demi';
  import { PageWrapper } from '/@/components/Page';
  import { Tinymce } from '/@/components/Tinymce';

  const value = ref('hello world');
  function handleChange(value: string) {
    console.log(value);
  }
</script>
