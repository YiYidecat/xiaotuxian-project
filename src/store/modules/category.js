// 分类模块
// 分类状态
// 存储的分类数据
import { topCategory } from '@/apis/constants'
import { findAllCategory } from '@/apis/category'

export default {
  namespaced: true,
  state: () => {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等数据加载完毕后才会看到
      // 所以需要根据常量数据来生成一个默认的顶级分类数据，不会出现空白
      // 分类列表
      list: topCategory.map(item => ({ name: item }))
    }
  },
  //  加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    },

    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()

      // 给一级分类加上一个控制二级分类显示隐藏的数据open
      result.forEach(item => { item.open = false })// 注意是forEach函数方法，而不是foreach，没有这个foreach函数
      // console.log(result)
      // 获取数据成功，提交mutations进行数据修改
      commit('setList', result)
    }
  }
}
