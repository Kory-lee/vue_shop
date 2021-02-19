<template>
  <AFooter :class="prefixCls" v-if="getShowLayoutFooter">
    <div :class="`${prefixCls}__links`">
      <div>Copyright &copy;2020 Admin</div>
    </div>
  </AFooter>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue';
  import { computed, defineComponent, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProviderContext } from '/@/components/Application/Provider/useAppContext';
  import { getShowFooter } from '/@/hooks/setting/RootSetting';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { AFooter: Layout.Footer },
    setup() {
      const { getPrefixCls } = useProviderContext();
      const { currentRoute } = useRouter(),
        getShowLayoutFooter = computed(
          () => unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
        );
      return { prefixCls: getPrefixCls('layout-footer'), getShowLayoutFooter };
    },
  });
</script>

<style lang="less">
  @class: ~'@{namespace}-layout-footer';
  @normal-color: rgba(0,0,0,0.45);

  @hover-color:rgba(0,0,0,0.85);
  .@{class}{
    color: @normal-color;
    text-align: center;
    &__links{
      margin-bottom:8px;
      a{
        color: @normal-color;
        &:hover{
          color:@hover-color;
        }
      }
    }
    &__github{
      margin: 0 30px;

      &:hover{
        color: @hover-color;
      }
    }
  }
</style>
