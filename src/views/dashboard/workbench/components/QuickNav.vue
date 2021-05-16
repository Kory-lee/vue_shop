<template>
  <Card v-bind="$attrs" title="快捷导航">
    <template v-for="item in items" :key="item">
      <CardGrid>
        <span class="flex flex-col items-center">
          <Icon :icon="item.icon" :color="item.color" size="20" />
          <span class="text-md mt-2">{{ item.title }}</span>
        </span>
      </CardGrid>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import { Card } from 'ant-design-vue';
  import { navItems } from './data';
  import Icon from '/@/components/Icon';

  export default defineComponent({
    name: 'QuickNav',
    components: { Icon, Card, CardGrid: Card.Grid },
    setup() {
      return { items: navItems };
    },
  });
</script>
