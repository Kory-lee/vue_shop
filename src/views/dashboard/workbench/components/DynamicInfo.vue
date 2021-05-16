<template>
  <Card :loading="loading" v-bind="$attrs" title="最新动态">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>
    <List item-layout="horizontal" :data-source="items">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta>
            <template #description>
              {{ item.date }}
            </template>
            <template #title>
              <span>{{ item.name }}</span>
              <span v-html="item.desc"></span>
            </template>
            <template #avatar>
              <Icon :icon="item.avatar" :size="30" />
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </Card>
</template>

<script lang="ts">
  import { Card, List } from 'ant-design-vue';
  import { defineComponent } from 'vue-demi';
  import { dynamicInfoItems } from './data';
  import Icon from '/@/components/Icon';

  export default defineComponent({
    name: 'DynamicInfo',
    components: { Icon, Card, List, ListItem: List.Item, ListItemMeta: List.Item.Meta },
    props: { loading: Boolean },
    setup() {
      return {
        items: dynamicInfoItems,
      };
    },
  });
</script>
