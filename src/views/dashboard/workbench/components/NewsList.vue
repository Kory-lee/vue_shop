<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { List } from "ant-design-vue";
export default defineComponent({
  name: "NewList",
  components: { List, ListItem: List.Item, ListItemMeta: List.Item.Meta },
});
</script>

<style></style>
