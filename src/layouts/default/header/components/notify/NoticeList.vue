<template>
  <List :class="prefixCls" bordered :pagination="getPagination">
    <template v-for="item of getData" :key="item.id">
      <ListItem class="list-item">
        <ListItemMeta>
          <template #title>
            <div class="title">
              <TypographyParagraph
                :class="{ 'cursor-pointer': isTitleClickable }"
                style="width: 100%; margin-bottom: 0 !important"
                :ellipsis="
                  ($props?.titleRows ?? 0) > 0
                    ? { rows: $props.titleRows, tooltip: !!item.title }
                    : false
                "
                :delete="item.titleDelete"
                :content="item.title"
                @click="handleTitleClick(item)"
              />
              <div class="extra" v-if="item.extra">
                <Tag class="tag" :color="item.color">
                  {{ item.extra }}
                </Tag>
              </div>
            </div>
          </template>
          <template #avatar>
            <Avatar v-if="item.avatar" class="avatar" :src="item.avatar" />
            <span v-else>{{ item.avatar }}</span>
          </template>

          <template #description>
            <div>
              <div class="description" v-if="item.description">
                <TypographyParagraph
                  style="width: 100%; margin-bottom: 0 !important"
                  :ellipsis="
                    ($props?.descRows ?? 0) > 0
                      ? { rows: $props.descRows, tooltip: !!item.description }
                      : false
                  "
                  :content="item.description"
                />
              </div>
              <div class="datetime">
                {{ item.datetime }}
              </div>
            </div>
          </template>
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>

<script lang="ts">
  import type { ListItem } from './data';

  import { computed, defineComponent, PropType, toRef, unref, watch } from 'vue';
  import { List, Avatar, Tag, Typography } from 'ant-design-vue';
  import { getPrefixCls } from '/@/hooks/web/useDesign';
  import { isNumber } from 'lodash';

  export default defineComponent({
    name: 'NoticeList',
    components: {
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      Avatar,
      Tag,
      TypographyParagraph: Typography.Paragraph,
    },
    props: {
      list: {
        type: Array as PropType<ListItem[]>,
        default: () => [],
      },
      pageSize: {
        type: [Boolean, Number] as PropType<boolean | number>,
        default: 5,
      },
      currentPage: {
        type: Number as PropType<number>,
        default: 1,
      },
      titleRows: {
        type: Number as PropType<number>,
        default: 1,
      },
      descRows: {
        type: Number as PropType<number>,
        default: 2,
      },
      onTitleClick: {
        type: Function as PropType<(Recordable) => void>,
      },
    },
    emits: ['update:currentPage', 'update:pageSize', 'updateCurrentPage'],
    setup(props, { emit }) {
      const prefixCls = getPrefixCls('header-notify-list');
      const currentPage = toRef(props, 'currentPage', 1);
      const getData = computed(() => {
        const { pageSize, list } = props;
        if (pageSize === false) return [];
        const size = isNumber(pageSize) ? pageSize : 5;
        return list.slice(size * (unref(currentPage) - 1), size * unref(currentPage));
      });

      const isTitleClickable = computed(() => !!props.onTitleClick);
      const getPagination = computed(() => {
        const { list, pageSize } = props;
        const paginatable = list?.length > pageSize && pageSize > 0;
        if (!paginatable) return false;
        return {
          total: list.length,
          pageSize,
          current: unref(currentPage),
          onChange: (p: number) => {
            currentPage.value = p;
            emit('updateCurrentPage', p);
            emit('update:currentPage', p);
          },
        };
      });

      watch(
        () => props.currentPage,
        (v) => (currentPage.value = v)
      );

      function handleTitleClick(item: ListItem) {
        props?.onTitleClick?.(item);
      }

      return { prefixCls, handleTitleClick, getData, isTitleClickable, getPagination };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-header-notify-list';

  .@{prefix-cls} {
    &::-webkit-scrollbar {
      display: none;
    }

    ::v-deep(.ant-pagination-disabled) {
      display: inline-block !important;
    }

    &-item {
      padding: 6px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;

      .title {
        margin-bottom: 8px;
        font-weight: normal;

        .extra {
          float: right;
          margin-top: -1.5px;
          margin-right: 0;
          font-weight: normal;

          .tag {
            margin-right: 0;
          }
        }

        .avatar {
          margin-top: 4px;
        }

        .description {
          font-size: 12px;
          line-height: 18px;
        }

        .datetime {
          margin-top: 4px;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
</style>
