<template>
  <component :is="configProvider" class="demo">
    <div style="margin: 30px">
      <KInput
        type="input"
        v-model:value="inputValue"
        clearable
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
      <k-el tag="k-button">帆帆帆帆</k-el>
    </div>
  </component>
</template>

<script>
  import { ref } from 'vue';
  import { siteSetup } from './store';

  export default {
    name: 'SiteProvider',
    setup() {
      const inputValue = ref('');

      function handleInput(val) {
        console.log(val);
      }

      function handleChange(val) {
        console.log(val, 'change');
      }

      return { inputValue, handleInput, handleChange, ...siteSetup() };
    },
  };
</script>
