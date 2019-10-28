// 提供 存储用户的相关信息的相关API
// 约定：key = Ni-Hao-00
const KEY = 'Ni-Hao-00'
const local = {
  // 存储
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  //   获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  //   清除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
export default local
