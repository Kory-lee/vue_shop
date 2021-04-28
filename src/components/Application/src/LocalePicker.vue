<template>
  <Dropdown
    :trigger="['click']"
    :drop-menu-list="localeList"
    :selected-keys="selectedKeys"
    :overlay-class-name="`${prefixCls}-overlay`"
    placement="bottomCenter"
    @menuEvent="handleMenuEvent"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" :size="size" />
      <span v-if="showText" class="ml-1">{{ getLangText }}</span>
    </span>
  </Dropdown>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watchEffect } from 'vue';
  import Icon from '/@/components/Icon';
  import { useProviderContext } from './Provider/useAppContext';
  import Dropdown, { DropMenu } from '/@/components/Dropdown';
  import { localeList } from '/@/settings/localeSetting';
  import { useLocale } from '/@/hooks/web/useLocale';
  import { LocaleType } from '/@/types/config';

  export default defineComponent({
    name: 'LocalePicker',
    components: { Dropdown, Icon },
    props: {
      showText: { type: Boolean, default: true },
      reload: Boolean,
      size: { type: [String, Number], default: 16 },
    },
    setup(props) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('locale-picker'),
        { changeLocale, getLocale } = useLocale(),
        selectedKeys = ref<string[]>([]);

      const getLangText = computed(() => {
        const key = unref(selectedKeys)[0];
        if (!key) return '';
        return localeList.find((item) => item.event === key)?.text;
      });

      watchEffect(() => {
        selectedKeys.value = [unref(getLocale)];
      });

      async function toggleLocale(lang: LocaleType | string) {
        await changeLocale(lang as LocaleType);
        selectedKeys.value = [lang as string];
        props.reload && location.reload();
      }

      function handleMenuEvent({ event }: DropMenu) {
        if (unref(getLocale) === event) return;
        toggleLocale(event as string);
      }

      return { localeList, prefixCls, getLangText, handleMenuEvent, selectedKeys };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-locale-picker';

  .@{prefix-cls}-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
</style>
