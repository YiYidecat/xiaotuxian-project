// 1.创建一个新的axios实例
// 2.请求拦截器，如果有token进行头部携带
// 3.响应拦截器：1.剥离无效数据 2.处理token失效
// 4.导出一个函数，调用当前的axios实例发起请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：有些接口不是基于axios发起的请求
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'

// 创建axios实例
const request = axios.create({
  // axios的配置
  baseURL,
  timeout: 5000 // 请求超时时间
})

// 拦截业务逻辑，进行请求配置的修改
request.interceptors.request.use(config => {
  // 1.获取用户信息对象
  const { profile } = store.state.user
  // 2.判断是否有token
  if (profile.token) {
    // 3.设置token,Bearer开头，空格隔开
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, error => {
  // 请求失败，进入Promise的reject
  return Promise.reject(error)
}
)

// res = . res.data 取出data数据，将来调用接口的时候直接拿到的就是后台的数据
request.interceptors.response.use(res => res.data, error => {
  // 401状态码，进入该函数
  if (error.response.status && error.response === 401) {
    // 1.清空无效用户信息
    store.commit('user/setUser', {})
    // 2.跳转到登录页
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(error)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发送请求：请求地址，请求方式，提交的数据
  return request({
    url,
    method,
    // 1.如果是get请求，需要使用params属性
    // 2.如果是post请求，需要使用data属性来传递submitData
    // 3.如果没有submitData，不需要添加属性
    ...(method.toLowerCase() === 'get' ? { params: submitData } : { data: submitData })
  })
}
