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
        <k-popover trigger="click" placement="right">
          <template #trigger>
            <k-button> 悬浮 </k-button>
          </template>
          <span>或许不想知道你的花园长得咋样</span>
        </k-popover>
      </KSpace>
      <k-el tag="span">帆帆帆帆</k-el>
      <k-divider title-placement="right">哗啦啦</k-divider>
      <k-table :single-line="false">
        <thead>
          <tr>
            <th>Abandon</th>
            <th>Abnormal</th>
            <th>Abolish</th>
            <th>...</th>
            <th>万事开头难</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>放弃</td>
            <td>反常的</td>
            <td>彻底废除</td>
            <td>...</td>
            <td>干！我刚才背的是啥</td>
          </tr>
          <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </k-table>
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
</style>
