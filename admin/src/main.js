import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

import './style.css'


Vue.config.productionTip = false

import http from './http'

Vue.prototype.$http = http

// 全局mixin，代码块，可以让每个vue实例都拥有
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})


Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
