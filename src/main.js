import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import Header from './components/header.vue';
Vue.component("Header", Header);

import GoodsList from "./components/goodslist.vue";
Vue.component("GoodsList",GoodsList)

import Swipe from "./components/swipe.vue";
Vue.component("Swipe", Swipe);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import axios from 'axios';
Vue.use(axios);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  watch: {
    '$route': function (to) {
      localStorage.routeName = to.name;
    }
  },
  render: h => h(App)
}).$mount('#app')