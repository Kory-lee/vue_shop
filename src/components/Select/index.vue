<template>
  <el-select v-model="data.selectValue" placeholder="请选择" clearable>
    <el-option v-for="item in data.initOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
import { reactive, onBeforeMount, watch, computed } from '@vue/composition-api';
export default {
  name: 'Select',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: String,
      default: '',
    },
  },
  setup(props, { root, emit }) {
    const data = reactive({
      options: [
        { value: 'name', label: '姓名' },
        { value: 'phone', label: '手机号' },
        { value: 'email', label: '邮箱' },
        { value: 'id', label: 'ID' },
        { value: 'title', label: '标题' },
      ],
      categoryOptions: null,
      initOptions: [],
      selectValue: null,
    });
    watch(
      () => data.selectValue,
      (value) => {
        emit('update:selected', value);
      }
    );
    watch(
      () => props.selected,
      (value) => (data.selectValue = value)
    );
    const initOption = () => {
      let tempArr;
      if (props.config.commitUrl) {
        tempArr = computed(() => root.$store.getters[props.config.commitUrl]?.data);
      } else {
        if (!props.config.init?.length) return false;
        tempArr = data.options.filter((elem) => props.config.init?.includes(elem.value));
        if (!tempArr?.length) return false;
        data.selectValue = tempArr[0].value;
      }
      data.initOptions = tempArr;
    };
    onBeforeMount(() => {
      initOption();
    });
    return { data };
  },
};
</script>

<style></style>
