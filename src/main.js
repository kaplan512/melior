import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {api} from './assets/api'
import VueRouter from 'vue-router'
import router from './router';

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
