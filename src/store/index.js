import { createStore } from 'vuex'

// 引入用户模块
import user from './modules/user'
// 引入分类模块
import category from './modules/category'
// 引入购物车模块
import cart from './modules/cart'

export default createStore({
  state: {
    // 数据
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    user,
    category,
    cart
  },
  getters: {
    // vuex的计算属性
  },
  // 开启数据持久化
  persisted: true
})
