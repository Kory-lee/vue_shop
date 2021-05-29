<template>
  <BasicModal
    v-bind="$attrs"
    :footer="null"
    :title="t('layout.header.lockScreen')"
    :class="prefixCls"
    @register="register"
  >
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img :src="avatar" :class="`${prefixCls}__header-img`" alt="" />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>

      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </a-button>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue-demi';
  import BasicModal from '/@/components/Modal/src/BasicModal.vue';
  import { useI18n } from 'vue-i18n';
  import { useProviderContext } from '/@/components/Application';
  import { useUserStore } from '/@/store/modules/user';
  import { useLockStore } from '/@/store/modules/lock';
  import { useModalInner } from '/@/components/Modal/src/hooks/useModal';
  import headerImg from '/@/assets/img/logo.png';

  export default defineComponent({
    name: 'LockModal',
    components: { BasicModal },
    setup() {
      const { t } = useI18n(),
        { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('header-lock-modal');

      const useStore = useUserStore(),
        lockStore = useLockStore();

      const getRealName = computed(() => useStore.getUserInfo?.realName);
      const [register, { closeModal }] = useModalInner();

      async function handleLock() {
        closeModal();

        lockStore.setLockInfo({ isLock: true, pwd: '1321' });
      }

      const avatar = computed(() => useStore.getUserInfo?.avatar || headerImg);
      return { t, prefixCls, getRealName, register, handleLock, avatar };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-header-lock-modal';

  .@{prefix-cls} {
    &__entry {
      position: relative;
      height: 240px;
      padding: 130px 30px 60px 30px;
      border-radius: 10px;
    }

    &__header {
      position: absolute;
      top: 0;
      left: calc(50% - 45px);
      width: auto;
      text-align: center;

      &-img {
        width: 70px;
        border-radius: 50%;
      }

      &-name {
        margin-top: 5px;
      }
    }

    &__footer {
      text-align: center;
    }
  }
</style>
