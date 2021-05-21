import type { ModalMethods, ReturnMethods, UseModalReturnType } from '../types';

import { computed, onMounted, reactive, ref, toRaw, unref } from 'vue-demi';
import { isProdMode } from '/@/utils/env';
import { error } from '/@/utils/log';
import { ModalProps } from 'ant-design-vue/lib/modal';
import { isEqual } from 'lodash';

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
    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.();
    },
    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
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
