<template>
  <div v-for="item of Object.keys(data)" :key="item">
    <h2>{{ names[item] }}</h2>
    <ul v-for="i of data[item]" :key="i">
      <li>
        <a :href="baseUrl + item + '/p' + i">{{ baseUrl + item + "/p" + i }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const baseUrl = "http://www.lonor.cn/h5/G4/yw/";
    const data = {
      duozi: [3, 7, 11, 21, 24, 28, 37, 41, 44, 52, 56, 60],
      duoci: [4, 7, 11, 22, 25, 29, 45, 52, 61],
      danci: [3, 22],
    };
    const names = { duoci: "多词", duozi: "多字", danci: "单词" };
    return { baseUrl, data, names };
  },
});
</script>

<style></style>
