import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.less'

import router from '@/router'

import axios from '@/api'

// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)

import plugin from '@/components'
Vue.use(plugin)

Vue.prototype.$http = axios

Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js 职责入口文件
// 职责1：创建根实例
// 职责2：依赖项目需要的全局资源
