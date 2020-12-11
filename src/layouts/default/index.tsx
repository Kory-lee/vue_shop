import { Layout } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
export default defineComponent({
  name: 'DefaultLayout',
  setup(props) {
    const renderFeatures = () => <>
    
    </>;
    return () => <Layout class="default-layout">{() => <RouterView />}</Layout>;
  },
});
