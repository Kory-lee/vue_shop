import { createApp } from 'vue';
import SiteRoot from './SiteRooter.vue';
import KoryUI from 'kory-ui';

const app = createApp(SiteRoot);
app.use(KoryUI);
app.mount('#app');
