import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from "axios";
import dataV from '@jiaminghi/data-view'
import 'element-ui/lib/theme-chalk/index.css';
import './axios'
import './permission'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Element)
Vue.use(dataV)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
