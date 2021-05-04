<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        :loading="loading"
        :title="item.title"
        :can-expan="false"
        :class="[index + 1 < 4 && '!md:mr-4']"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        size="small"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between">
          <CountTo prefix="$" :start-val="1" :end-val="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :start-val="1" :end-val="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi';
  import { growCardList } from '/@/views/dashboard/analysis/data';
  import { Card, Tag } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import CountTo from '/@/components/CountTo';

  export default defineComponent({
    name: 'GrowCard',
    components: { Card, Tag, Icon, CountTo },
    props: { loading: Boolean },
    setup() {
      return { growCardList };
    },
  });
</script>

<style scoped></style>
