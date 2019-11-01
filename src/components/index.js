// 全局注册
import MyBread from '@/components/my-bread'
import MYChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // Vue是一个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MYChannel)
  }
}
