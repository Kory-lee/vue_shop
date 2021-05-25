import type {
  ModalMethods,
  ReturnMethods,
  UseModalReturnType,
  ModalProps,
  UseModalInnerReturnType,
} from '../types';

import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue-demi';
import { isProdMode } from '/@/utils/env';
import { error } from '/@/utils/log';
import isEqual from 'lodash/isEqual';
import { tryOnUnmounted } from '@vueuse/core';
import { isFunction } from '/@/utils/is';

const dataTransferRef = reactive<any>({});

const visibleData = reactive<{ [key: number]: boolean }>({});

export function useModal(): UseModalReturnType {
  const modalRef = ref<Nullable<ModalMethods>>(null);
  const loadedRef = ref(false);
  const uidRef = ref('');

  function register(modalMethods: ModalMethods, uuid: string) {
    uidRef.value = uuid;

    isProdMode() &&
      onMounted(() => {
        modalRef.value = null;
        loadedRef.value = false;
        dataTransferRef[unref(uidRef)] = null;
      });
    if (unref(loadedRef) && isProdMode() && modalMethods === unref(modalRef)) return;

    modalRef.value = modalMethods;
    modalMethods.emitVisible = (visible: boolean, uid: number) => (visibleData[uid] = visible);
  }

  const getInstance = () => {
    const instance = unref(modalRef);
    if (!instance) error('useModal instance is undefined');
    return instance;
  };
  const methods: ReturnMethods = {
    setModalProps(props: Partial<ModalProps>): void {
      getInstance()?.setModalProps(props);
    },
    getVisible: computed(() => visibleData[~~unref(uidRef)]),
    redoModalHeight() {
      getInstance()?.redoModalHeight?.();
    },
    openModal<T = any>(visible = true, data?: T, openOnSet = true): void {
      getInstance()?.setModalProps({ visible });
      if (!data) return;

      if (openOnSet) {
        dataTransferRef[unref(uidRef)] = null;
        dataTransferRef[unref(uidRef)] = toRaw(data);
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uidRef)]), toRaw(data));
      if (!equal) dataTransferRef[unref(uidRef)] = toRaw(data);
    },
  };
  return [register, methods];
}

export function useModalInner(callback?: Fn): UseModalInnerReturnType {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref('');

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) error('useModalInner instance is undefined!');
    return instance;
  };

  const register = (modalInstance: ModalMethods, uuid: string) => {
    isProdMode() && tryOnUnmounted(() => (modalInstanceRef.value = null));
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };
  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)];
    if (!data) return;
    if (!callback || !isFunction(callback)) return;
    nextTick(() => callback(data));
  });
  return [
    register,
    {
      changeLoading: (loading = true) => getInstance()?.setModalProps({ loading }),
      changeOkLoading: (loading = true) =>
        getInstance()?.setModalProps({ confirmLoading: loading }),
      getVisible: computed((): boolean => visibleData[~~unref(uidRef)]),
      closeModal: () => getInstance()?.setModalProps({ visible: false }),
      setModalProps: (props: Partial<ModalProps>) => getInstance()?.setModalProps(props),
    },
  ];
}
