import Vue from 'vue';
import VueArweave from 'vue-arweave';

// bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faBoxOpen,
  faCube,
  faFileContract,
  faSearch,
  faFolderPlus,
  faHandSpock,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// font awesome icons
library.add(faUser);
library.add(faBoxOpen);
library.add(faCube);
library.add(faSearch);
library.add(faFileContract);
library.add(faFolderPlus);
library.add(faHandSpock);
library.add(faAward);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueArweave);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
