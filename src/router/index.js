import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }]
})
