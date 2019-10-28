import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'

import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: Welcome
    },
    {
      path: '*',
      component: NotFound
    }
    ]
  }
  ]
})
