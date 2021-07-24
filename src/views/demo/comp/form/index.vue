<template>
  <PageWrapper title="表单基础示例">
    <KInput
      type="input"
      v-model:value="inputValue"
      placeholder="anything"
      @update:value="handleInput"
      @change="handleChange"
      @click="handleInput"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { KInput } from '/@/ui/input';
  import { ref } from 'vue';

  export default defineComponent({
    components: { PageWrapper, KInput },
    setup() {
      const inputValue = ref('');
      function handleInput(val) {
        console.log(val);
      }
      function handleChange(val) {
        console.log(val, 'change');
      }
      return { inputValue, handleInput, handleChange };
    },
  });
</script>
