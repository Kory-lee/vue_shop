<template>
  <Dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :dropMenuList="getLocaleList"
    :selectedKeys="selectedKeys"
    @menuEvent="handleMenuEvent"
    :overlayClassName="`${prefixCls}-overlay`"
  >
    <span :class="prefixCls">
      <Icon icon="ion:language" :size="size" />
      <span v-if="showText" :class="`${prefixCls}__text`">{{ getLangText }}</span>
    </span>
  </Dropdown>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watchEffect } from 'vue';
  import Icon from '../../Icon';
  import { useProviderContext } from './Provider/useAppContext';
  import Dropdown, { DropMenu } from '/@/components/Dropdown';
  import { getLang, getLocaleList } from '/@/hooks/setting/LocaleSetting';
  import { changeLocale } from '/@/hooks/web/useLocale';
  import { LocaleType } from '/@/locales/types';

  export default defineComponent({
    name: 'LocalePicker',
    components: { Dropdown, Icon },
    props: { showText: { type: Boolean, default: true }, reload: Boolean, size: [String, Number] },
    setup(props) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('locale-picker'),
        selectedKeys = ref<string[]>([]);

      const getLangText = computed(() => {
        const key = unref(selectedKeys)[0];
        if (!key) return '';
        return unref(getLocaleList).find((item) => item.event === key)?.text;
      });

      watchEffect(() => {
        selectedKeys.value = [unref(getLang)];
      });

      function toggleLocale(lang: LocaleType | string) {
        changeLocale(lang as LocaleType);
        selectedKeys.value = [lang as string];
        props.reload && location.reload();
      }

      function handleMenuEvent(menu: DropMenu) {
        if (unref(getLang) === menu.event) return;
        toggleLocale(menu.event as string);
      }

      return { prefixCls, getLocaleList, getLangText, handleMenuEvent, selectedKeys };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-locale-picker';

  :global(.@{prefix-cls}-overlay) {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    cursor: pointer;

    &__text {
      margin-left: 6px;
    }
  }
</style>
