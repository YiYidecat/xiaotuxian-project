// 用户模块

export default {
  namespaced: true,
  // 用户状态
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  // 修改用户信息的函数
  mutations: {
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
