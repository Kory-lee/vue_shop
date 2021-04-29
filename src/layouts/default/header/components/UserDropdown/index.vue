<template>
  <Dropdown :overlay-class-name="`${prefixCls}-dropdown-overlay`" placement="bottomLeft">
    <span :class="[prefixCls, `${prefixCLs}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="headerImg" alt="" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name truncate`"> {{ getUserInfo.realName }}</span>
      </span>
    </span>
    <template #overlay>
      <Menu>
        <MenuItem
          v-if="getShowDoc"
          key="doc"
          :text="t('layout.header.dropdownItemDoc')"
          icon="ion:document-text-outline"
        />
        <MenuDivider v-if="getShowDoc" />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { computed, PropType } from '@vue/runtime-core';
  import { useProviderContext } from '/@/components/Application';
  import headerImg from '/@/assets/img/logo.png';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '/@/store/modules/user';
  import { openWindow } from '/@/utils/common';
  import { DOC_URL } from '/@/settings/siteSetting';
  import { Menu, Dropdown } from 'ant-design-vue';
  import { getShowDoc } from '/@/hooks/setting/useHeaderSetting';
  import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

  export default {
    name: 'UserDropdown',
    components: {
      Menu,
      MenuItem: createAsyncComponent(() => import('./UserDropdownMenuItem.vue')),
      MenuDivider: Menu.Divider,
      Dropdown,
    },
    props: { theme: { type: String as PropType<'light' | 'dark'>, default: 'light' } },
    setup() {
      const { getPrefixCls } = useProviderContext();
      const { t } = useI18n();
      const userStore = useUserStore();
      const getUserInfo = computed(() => {
        const { realName = '', desc } = userStore.getUserInfo || {};
        return { realName, desc };
      });
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      function openDoc() {
        openWindow(DOC_URL);
      }
      return {
        prefixCls: getPrefixCls('header-user-dropdown'),
        headerImg,
        t,
        getUserInfo,
        handleLoginOut,
        openDoc,
        getShowDoc,
      };
    },
  };
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';
  .@{prefix-cls} {
    height: @header-height;
    padding: 0 10px 0 10px;
  }
</style>
