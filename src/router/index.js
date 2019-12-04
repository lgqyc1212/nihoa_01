import VueRouter from 'vue-router'
import Vue from 'vue'

import local from '@/utils/local'

// import Login from '@/views/login'
// import Home from '@/views/home'
// import Welcome from '@/views/welcome'
// import Article from '@/views/article'
// import Image from '@/views/Image'
// import Publish from '@/views/publish'
// import Comment from '@/views/comment'
// import Fans from '@/views/fans'
// import Setting from '@/views/setting'
// import NotFound from '@/views/404'
// import local from '@/utils/local'

const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Welcome = () => import('@/views/welcome')
const Article = () => import('@/views/article')
const Image = () => import('@/views/Image')
const Publish = () => import('@/views/publish')
const Comment = () => import('@/views/comment')
const Fans = () => import('@/views/fans')
const Setting = () => import('@/views/setting')
const NotFound = () => import('@/views/404')

Vue.use(VueRouter)
const router = new VueRouter({
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
      path: '/article',
      component: Article
    },
    {
      path: '/image',
      component: Image
    },
    {
      path: '/publish',
      component: Publish
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/fans',
      component: Fans
    },
    {
      path: '/setting',
      component: Setting
    }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})

// 添加路由的 导航守卫 (前置导航守卫)
router.beforeEach((to, from, next) => {
  // 当每次跳转路由前触发
  // to 跳转到目标 路由对象
  // from 从哪里跳转过来 路由对象
  // next 下一步方法  next()放行 next('/login')拦截
  const user = local.getUser()
  // 如果登录
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
