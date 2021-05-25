<template>
  <Dropdown :overlay-class-name="`${prefixCls}-dropdown-overlay`" placement="bottomLeft">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" alt="" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name truncate`"> {{ getUserInfo.realName }}</span>
      </span>
    </span>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem key="doc">
          <span class="flex items-center">
            <Icon icon="ion:document-text-outline" class="mr-1" />
            <span>{{ t('layout.header.dropdownItemDoc') }}</span>
          </span>
        </MenuItem>
        <MenuDivider v-if="getShowDoc" />

        <MenuItem key="lock">
          <span class="flex items-center">
            <Icon icon="ion:lock-closed-outline" class="mr-1" />
            <span>{{ t('layout.header.tooltipLock') }}</span>
          </span>
        </MenuItem>
        <MenuItem key="logout">
          <span class="flex items-center">
            <Icon icon="ion:power-outline" class="mr-1" />
            <span>{{ t('layout.header.dropdownItemLoginOut') }}</span>
          </span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from '@vue/runtime-core';
  import { useProviderContext } from '/@/components/Application';
  import headerImg from '/@/assets/img/logo.png';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '/@/store/modules/user';
  import { openWindow } from '/@/utils/common';
  import { DOC_URL } from '/@/settings/siteSetting';
  import { Menu, Dropdown } from 'ant-design-vue';
  import { getShowDoc } from '/@/hooks/setting/useHeaderSetting';
  import Icon from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';

  type MenuEvent = 'logout' | 'doc' | 'lock';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Menu,
      MenuItem: Menu.Item,
      MenuDivider: Menu.Divider,
      Dropdown,
      Icon,
    },
    props: { theme: { type: String as PropType<'light' | 'dark'>, default: 'light' } },
    setup() {
      const { getPrefixCls } = useProviderContext();
      const { t } = useI18n();
      const userStore = useUserStore();
      const getUserInfo = computed(() => {
        const { realName = '', desc, avatar } = userStore.getUserInfo || {};
        return { realName, desc, avatar: avatar || headerImg };
      });

      const [register, { openModal }] = useModal();

      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      function openDoc() {
        openWindow(DOC_URL);
      }

      function handleLock() {
        openModal(true);
      }

      function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'logout':
            handleLoginOut();
            break;
          case 'doc':
            openDoc();
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      return {
        prefixCls: getPrefixCls('header-user-dropdown'),
        t,
        getUserInfo,
        handleLoginOut,
        openDoc,
        getShowDoc,
        handleMenuClick,
        register,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 10px 0 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
