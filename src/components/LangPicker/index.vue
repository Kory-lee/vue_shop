<template>
  <Dropdown :trigger="['click']">
    <span class="lang-picker">
      <GlobalOutlined class="lang-picker__icon" />
      <span>hello</span>
    </span>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dropdown } from 'ant-design-vue';
import { GlobalOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'LangPicker',
  components: { Dropdown, GlobalOutlined },
  props: { showText: { type: Boolean, default: true }, reload: { type: Boolean } },
  setup(props) {},
});
</script>

<style></style>
