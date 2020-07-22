<template>
  <el-row :gutter="10" ref="picker">
    <div class="overflow-hidden">
      <el-col
        :span="24 / pickSizes.length"
        v-for="(item, index) in pickSizes"
        :key="item"
      >
        <el-select
          v-model="picker[`${item}`]"
          clearable
          size="mini"
          placeholder="请选择"
          @change="(val) => getPickerData(val, index)"
        >
          <el-option
            v-for="option in options[`${item}`]"
            :key="option[`${item}_ID`.toUpperCase()]"
            :label="option[`${item}_NAME`.toUpperCase()]"
            :value="option[`${item}_CODE`.toUpperCase()]"
          >
          </el-option>
        </el-select>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import { GetCityPicker } from "@api/user";
import { reactive, onBeforeMount, computed, watch } from "@vue/composition-api";
const initData = (arr) => {
  let obj = {};
  arr.forEach((item) => (obj[item] = []));
  return obj;
};
export default {
  name: "CityPicker",
  props: {
    config: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { root, emit }) {
    const pickSizes = props.config;
    const options = reactive(initData(pickSizes));
    const picker = computed({ get: () => props.value, set: (val) => val });
    // 对options注册上一个选中的值的依赖
    const getPicker = () => {
      for (let i = 0; i <= pickSizes.length - 1; i++) {
        watch(
          () => picker.value[`${pickSizes[i]}`],
          (value) => value && getProvincePicker(i + 1, value)
        );
      }
    };
    getPicker();

    const getPickerData = async (val, index) => {
      // 点击最后一个选择框时
      if (index === pickSizes.length - 1) return;
      // 清空该选择框后所有选择框的值（若有的话
      for (; index < pickSizes.length - 1; index++) {
        picker.value[`${pickSizes[index + 1]}`] = "";
        options[`${pickSizes[index + 2]}`] = [];
      }
      emit("input", picker);
      // getProvincePicker(index, val);
    };
    const getProvincePicker = async (index = 0, val) => {
      if (index > pickSizes.length - 1) return false;
      let params = { type: pickSizes[index] };
      if (index !== 0) params[`${pickSizes[index - 1]}_code`] = val;
      await root.$request(
        () => GetCityPicker(params),
        ({ data }) => (options[`${pickSizes[index]}`] = data)
      );
    };
    onBeforeMount(() => {
      getProvincePicker();
    });
    return {
      picker,
      options,
      pickSizes,
      getPickerData,
    };
  },
};
</script>

<style lang="scss" scoped></style>
