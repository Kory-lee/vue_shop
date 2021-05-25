<template>
  <Modal @cancel="handleCancel" v-bind="getBindValue">
    <template #closeIcon v-if="!$slots.closeIcon">
      <ModalClose
        :can-fullscreen="getProps.canFullscreen"
        :full-screen="fullScreenRef"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>

    <template #title v-if="!$slots.title"></template>

    <template #footer v-if="!$slots.footer">
      <!--        <template #[item]="data" v-for="item in Object.keys($slots)">-->
      <!--          <slot :name="item" v-bind="data"></slot>-->
      <!--        </template>-->
    </template>

    <ModalWrapper
      ref="modalWrapperRef"
      v-bind="omit(getProps.wrapperProps, 'visible', 'height', 'modalFooterHeight')"
      :use-wrapper="getProps.useWrapper"
      :footer-offset="wrapperFooterOffset"
      :fullscreen="fullScreenRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :min-height="getProps.minHeight"
      :height="getWrapperHeight"
      :visible="visibleRef"
      :modal-footer-height="!footer ? 0 : undefined"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    >
      <slot></slot>
    </ModalWrapper>

    <template #[item]="data" v-for="item of Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </Modal>
</template>

<script lang="ts">
  import type { ModalMethods, ModalProps } from '/@/components/Modal/src/types';

  import { computed, defineComponent, getCurrentInstance, watch, watchEffect } from 'vue-demi';
  import Modal from './components/Modal.vue';
  import ModalClose from './components/ModalClose.vue';
  import omit from 'lodash-es/omit';
  import { nextTick, ref, toRef, unref } from 'vue';
  import { basicProps } from './props';
  import { deepMerge } from '/@/utils/common';
  import { useFullScreen } from './hooks/useModalFullScreen';
  import { isFunction } from '/@/utils/is';
  import ModalWrapper from './components/ModalWrapper.vue';

  export default defineComponent({
    name: 'BasicModal',
    components: { ModalWrapper, ModalClose, Modal },
    inheritAttrs: false,
    props: basicProps,
    emits: ['register', 'visible-change', 'cancel', 'ok', 'height-change'],
    setup(props, { emit, attrs }) {
      const visibleRef = ref(false);
      const propsRef = ref<Partial<ModalProps> | null>(null);
      const modalWrapperRef = ref<ComponentRef>(null);

      const extHeightRef = ref(0);
      const modalMethods: ModalMethods = {
        setModalProps,
        emitVisible: undefined,
        redoModalHeight: () =>
          nextTick(() => {
            if (unref(modalWrapperRef)) (unref(modalMethods) as any).setModalHeight();
          }),
      };
      const instance = getCurrentInstance();
      if (instance) emit('register', modalMethods, instance.uid);

      const getMergeProps = computed(
        (): ModalProps => ({
          ...props,
          ...(unref(propsRef) as any),
        })
      );

      const { handleFullScreen, getWrapClassName, fullScreenRef } = useFullScreen({
        modalWrapperRef,
        extHeightRef,
        wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
      });
      const getProps = computed(
        (): ModalProps => ({
          ...unref(getMergeProps),
          visible: unref(visibleRef),
          okButtonProps: undefined,
          cancelButtonProps: undefined,
          title: undefined,
          wrapClassName: unref(getWrapClassName),
        })
      );
      const getBindValue = computed((): Recordable => {
        const attr = { ...attrs, ...unref(getProps) };
        if (unref(fullScreenRef)) return omit(attr, 'height');
        return attr;
      });

      const getWrapperHeight = computed(() => {
        if (unref(fullScreenRef)) return undefined;
        return unref(getProps).height;
      });

      watchEffect(() => {
        visibleRef.value = props.visible;
        fullScreenRef.value = props.defaultFullScreen;
      });

      watch(
        visibleRef,
        (v) => {
          emit('visible-change', v);
          instance && modalMethods.emitVisible?.(v, instance.uid);
          nextTick(() => {
            if (props.scrollTop && v && unref(modalWrapperRef))
              (unref(modalWrapperRef) as any).scrollTop();
          });
        },
        { immediate: true }
      );

      async function handleCancel(e: Event) {
        e?.stopPropagation();
        if (props.closeFunc && isFunction(props.closeFunc)) {
          const isClose: boolean = await props.closeFunc();
          visibleRef.value = !isClose;
          return;
        }
        visibleRef.value = false;
        emit('cancel');
      }

      function handleOk() {
        emit('ok');
      }

      function setModalProps(props: Partial<ModalProps>) {
        propsRef.value = deepMerge(unref(propsRef) || {}, props);
        if (!Reflect.has(props, 'visible')) return;
        visibleRef.value = !!props.visible;
      }

      function handleHeightChange(height: string) {
        emit('height-change', height);
      }

      function handleExtHeight(height: number) {
        extHeightRef.value = height;
      }

      function handleTitleDbClick(e: ChangeEvent) {
        if (!props.canFullscreen) return;
        e?.stopPropagation();
        handleFullScreen(e);
      }

      return {
        visibleRef,
        getBindValue,
        omit,
        getMergeProps,
        getProps,
        fullScreenRef,
        getWrapperHeight,
        handleOk,
        handleCancel,
        handleFullScreen,
        handleHeightChange,
        handleExtHeight,
        handleTitleDbClick,
      };
    },
  });
</script>
