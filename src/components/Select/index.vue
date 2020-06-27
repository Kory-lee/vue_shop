<template>
  <el-select v-model="data.selectValue" placeholder="请选择" clearable>
    <el-option v-for="item in data.initOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api';
export default {
  name: 'Select',
  props: {
    config: {
      type: Array,
      default: () => {},
    },
  },
  setup(props) {
    const data = reactive({
      options: [
        { value: 'name', label: '姓名' },
        { value: 'phone', label: '手机号' },
        { value: 'email', label: '邮箱' },
        { value: 'id', label: 'ID' },
        { value: 'title', label: '标题' },
      ],
      initOptions: [],
      selectValue: '',
    });
    let initOption = () => {
      let tempArr;
      if (!props.config.init.length) return false;
      tempArr = data.options.filter((elem) => props.config.init.includes(elem.value));
      if (!tempArr.length) return false;
      data.initOptions = tempArr;
      data.selectValue = tempArr[0].value;
    };
    onMounted(() => {
      initOption();
    });
    return { data };
  },
};
</script>

<style></style>
