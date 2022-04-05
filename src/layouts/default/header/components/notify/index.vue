<template>
  <div :class="prefixCls">
    <Popover trigger="click" :overlay-calss-name="`${prefixCls}__overlay`">
      <Badge :count="count" dot>
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in listData" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="!!item.list?.length">({{ item.list.length }})</span>
              </template>
              <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
              <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
              <NoticeList :list="item.list" v-else />
            </TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>

<script lang="ts">
  import type { ListItem } from './data';

  import { defineComponent, unref, ref, computed } from 'vue-demi';
  import { getPrefixCls } from '/@/hooks/web/useDesign';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { tabListData } from './data';
  import { createMessage } from '/@/hooks/web/useMessage';
  import NoticeList from './NoticeList.vue';

  export default defineComponent({
    name: 'Notify',
    components: {
      Popover,
      Tabs,
      Badge,
      BellOutlined,
      TabPane: Tabs.TabPane,
      NoticeList,
    },
    setup() {
      const prefixCls = getPrefixCls('header-notify');
      const listData = ref(tabListData);

      const count = computed(() =>
        unref(listData).reduce((total, item) => total + item.list.length, 0)
      );

      function onNoticeClick(record: ListItem) {
        createMessage.success('你点击了通知，ID=' + record.id);
        // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
        record.titleDelete = !record.titleDelete;
      }
      return { prefixCls, count, onNoticeClick, listData };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
