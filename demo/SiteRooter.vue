<template>
  <div>
    <KInput
      type="input"
      v-model:value="inputValue"
      placeholder="hello"
      @update:value="handleInput"
      @change="handleChange"
      @click="handleInput"
    />
    <KSpace justify="end">
      <KButton v-for="item in 3" :key="item" :disabled="item === 2" @click="handleInput"
        >test{{ item }}
      </KButton>
    </KSpace>
  </div>
</template>

<script>
  import { KInput } from '/@/input';
  import { ref } from 'vue';
  import { KSpace } from '/@/space';
  import { KButton } from '/@/button';

  export default {
    name: 'SiteProvider',
    components: { KSpace, KButton, KInput },
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
  };
</script>
