<template>
  <el-select
    v-model="selectValue"
    placeholder="请选择"
    clearable
    @change="handleChange"
  >
    <el-option
      v-for="item in data.initOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
import {
  reactive,
  onBeforeMount,
  ref,
  computed,
  watch,
} from "@vue/composition-api";
export default {
  name: "MySelect",
  props: {
    config: { type: Object, default: () => {} },
    selected: { type: String, default: "" },
    value: { type: Object, default: () => {} },
  },
  setup(props, { root, emit }) {
    const data = reactive({
      options: [
        { value: "truename", label: "真实姓名" },
        { value: "name", label: "姓名" },
        { value: "username", label: "用户名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" },
      ],
      categoryOptions: null,
      initOptions: [],
    });
    const selectValue = ref("");
    watch(
      () => props.selected,
      (value) => (selectValue.value = value)
    );
    const handleChange = (val) => emit("update:selected", val);
    const initOption = () => {
      let tempArr;
      if (props.config.init?.length) {
        tempArr = data.options.filter((elem) =>
          props.config.init?.includes(elem.value)
        );
        selectValue.value = tempArr[0].value;
        emit("update:selected", selectValue.value);
      } else {
        tempArr = computed(
          () => root.$store.getters[props.config.commitUrl]?.data
        );
      }
      data.initOptions = tempArr;
    };
    onBeforeMount(() => {
      initOption();
    });
    return { data, selectValue, handleChange };
  },
};
</script>

<style></style>
