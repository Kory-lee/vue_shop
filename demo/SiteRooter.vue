<template>
  <component :is="configProvider" class="demo">
    <div>
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
      <k-el tag="span">帆帆帆帆</k-el>
      <k-grid cols="2 400:4 600:6">
        <k-grid-item>
          <div class="light-green">1</div>
        </k-grid-item>
        <k-grid-item>
          <div class="green">2</div>
        </k-grid-item>
        <k-grid-item>
          <div class="light-green">3</div>
        </k-grid-item>
        <k-grid-item>
          <div class="green">4</div>
        </k-grid-item>
        <k-grid-item>
          <div class="light-green">5</div>
        </k-grid-item>
        <k-grid-item>
          <div class="green">6</div>
        </k-grid-item>
      </k-grid>

      <k-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
        <k-grid-item>
          <div class="light-green">1</div>
        </k-grid-item>
        <k-grid-item>
          <div class="green">2</div>
        </k-grid-item>
        <k-grid-item>
          <div class="light-green">3</div>
        </k-grid-item>
        <k-grid-item>
          <div class="green">4</div>
        </k-grid-item>
        <k-grid-item>
          <div class="light-green">5</div>
        </k-grid-item>
        <k-grid-item>
          <div class="green">6</div>
        </k-grid-item>
        <k-grid-item>
          <div class="light-green">7</div>
        </k-grid-item>
      </k-grid>
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
<style>
  .demo {
    padding: 30px;
  }

  .light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
  }

  .green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
  }
</style>
