import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker.ts';
// eslint-disable-next-line
import router from './router/index';
// eslint-disable-next-line
import store from './store/index';

createApp(App).use(store).use(router).mount('#app');
