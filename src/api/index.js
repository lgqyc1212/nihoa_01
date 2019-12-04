// 导出一个配置好的axios对象
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import JSONBIG from 'json-bigint'

// 对axios进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 解决最大安全值
axios.defaults.transformResponse = [(data) => {
  // 对data进行格式转换 data 就是后台响应的json字符串
  // 如果没有数据  data === null 使用JSONBUIG.parse(null)报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// 设置默认的请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 请求拦截拦截
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
// 拦截成功 往headers中加token
  const user = local.getUser() || {}
  // config.headers设置头   Authorization 键
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取响应状态码 err.response 响应对象 err.response.status 状态码
  if (err.response.states === 401) {
    // 如果是401跳转登录
    // 麻烦 window.location.http='http://locatin.hash:8080/#/login'
    // 不推荐 window.location.hash = '#/login'
    // 使用vue-router进行跳转
    return router.push('/login')
  }
  return Promise.reject(err)
})
// ... 很多配置

export default axios
