import { defineComponent, nextTick, reactive, ref, Ref, onUnmounted } from 'vue-demi';
import { Modal } from 'ant-design-vue';

let uid = 0;

interface ModalItem {
  uid: typeof uid;
  component: any;
  componentData: any;
  modalData: any;
}
const modals: Ref<ModalItem[]> = ref([]);

function register(component, componentData) {
  uid++;
  const modal = reactive<ModalItem>({
    uid,
    component,
    componentData,
    modalData: { value: false },
  });
  let methods: any = {
    hidden(refresh = false) {
      modal.modalData.value = false;
      refresh && methods?.refresh()
    },
    destory() {
      const index = modals.value.findIndex(({ uid }) => modal.uid === uid);
      if (index !== -1) modals.value.slice(index, 1);
      methods = null;
    },
    refresh() {
      nextTick(() => (modal.componentData = componentData));
    },
  };
  return methods;
}

export default defineComponent({
  name: 'ModalContainer',
  components: { Modal },
  setup() {
    onUnmounted(() => {
      modals.value = [];
    });
    return () => (
      <div id="modal-contianer">
        {modals.value.map((modal) => (
          <Modal key={modal.uid}>
            <modal.component />
          </Modal>
        ))}
      </div>
    );
  },
});
