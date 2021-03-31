<template>
  <MenuItem
    :name="item.path"
    v-if="!menuHasChildren(item) && getShowMenu"
    v-bind="$props"
    :class="getLevelClass"
  >
    <Icon v-if="getIcon" :icon="getIcon" :size="16" />
    <div v-if="collapsedShowTitle && getIsCollapseParent" class="mt-1 collapse-title">
      {{ getI18nName }}
    </div>
    <template #title>
      <span :class="['ml-2', `${prefixCls}-sub-title`]">
        {{ getI18nName }}
      </span>
    </template>
  </MenuItem>
  <SubMenuItem
    :name="item.path"
    v-if="menuHasChildren(item) && getShowMenu"
    :class="[getLevelClass, theme]"
    :collapsedShowTitle="collapsedShowTitle"
  >
    <template #title>
      <Icon v-if="getIcon" :icon="getIcon" :size="16" />

      <div v-if="collapsedShowTitle && getIsCollapseParent" class="mt-2 collapse-title">
        {{ getI18nName }}
      </div>
      <span v-show="getShowSubTitle" :class="['ml-2', `${prefixCls}-sub-title`]">
        {{ getI18nName }}
      </span>
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SimpleSubMenu v-bind="$props" :item="childrenItem" :parent="false" />
    </template>
  </SubMenuItem>
</template>

<script lang="ts">
  import type { MenuType } from '/@/router/types';

  import { computed, defineComponent, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useProviderContext } from '../../Application';
  import Icon from '../../Icon';
  import MenuItem from './components/MenuItem.vue';
  import SubMenuItem from './components/SubMenuItem.vue';

  export default defineComponent({
    name: 'SimpleSubMenu',
    components: { MenuItem, Icon, SubMenuItem },
    props: {
      item: { type: Object as PropType<MenuType>, default: () => ({}) },
      parent: Boolean,
      collapsedShowTitle: Boolean,
      collapse: Boolean,
      theme: { type: String as PropType<'dark' | 'light'> },
    },
    setup(props) {
      const { getPrefixCls } = useProviderContext(),
        { t } = useI18n(),
        prefixCls = getPrefixCls('simple-menu'),
        getShowMenu = computed(() => !props.item?.hideMenu),
        getIcon = computed(() => props?.item.icon),
        getI18nName = computed(() => t(props.item?.name)),
        getShowSubTitle = computed(() => !props.collapse || !props.parent),
        getIsCollapseParent = computed(() => !!props.collapse && !!props.parent),
        getLevelClass = computed(() => ({
          [`${prefixCls}__parent`]: props.parent,
          [`${prefixCls}__children`]: !props.parent,
        }));

      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          !menuTreeItem.meta?.hideChildrenInMenu &&
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children?.length
        );
      }

      return {
        prefixCls,
        menuHasChildren,
        getShowMenu,
        getIcon,
        getI18nName,
        getShowSubTitle,
        getLevelClass,
        getIsCollapseParent,
      };
    },
  });
</script>
