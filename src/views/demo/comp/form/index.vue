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
    <KSpace justify="end">
      <span v-for="item in 3" :key="item">{{ item }}</span>
    </KSpace>
    <KButton>test</KButton>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { KInput } from '/@/ui/input';
  import { ref } from 'vue';
  import { KSpace } from '/@/ui/space';
  import { KButton } from '/@/ui/button';

  export default defineComponent({
    components: { PageWrapper, KInput, KSpace, KButton },
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
