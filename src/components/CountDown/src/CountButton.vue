<template>
  <Button v-bind="$attrs" :disable="isStart" :loading="loading" @click="handleStart">
    {{
      !isStart
        ? t('component.countDown.normalText')
        : t('component.countDown.sendText', [currentCount])
    }}
  </Button>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue-demi';
  import { Button } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { useCountDown } from './useCountDown';
  import { useI18n } from 'vue-i18n';
  import { isFunction } from '/@/utils/is';

  export default defineComponent({
    name: 'CountButton',
    components: { Button },
    inheritAttrs: false,
    props: {
      value: null,
      count: {
        type: Number,
        default: 60,
      },
      beforeStartFunc: {
        type: Function as PropType<() => boolean>,
        default: null,
      },
    },
    setup(props) {
      const loading = ref(false);
      const { t } = useI18n();
      const { currentCount, isStart, start, reset } = useCountDown(props.count);

      watchEffect(() => props.value === undefined && reset());

      async function handleStart() {
        const { beforeStartFunc } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            const canStart = await beforeStartFunc();
            canStart && start();
          } finally {
            loading.value = false;
          }
        } else start();
      }

      return { t, loading, handleStart, currentCount, isStart };
    },
  });
</script>
