<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="i in 10" :key="i">
                <RouterLink to="/">居家</RouterLink>
                <RouterLink to="/">洗漱</RouterLink>
                <RouterLink to="/">清洁</RouterLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'

export default {
  name: 'HomeCategory',

  setup () {
    // 获取vuex的一级分类，并且只需要两个二级分类
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }]
    })

    // 需要在组件内部定义一个品牌数据
    // 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据（9分类+1品牌）数组
    const store = useStore()
    const menuList = computed(() => {
      const arr = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2)
        }
      })
      arr.push(brand)
      return arr
    })
    return { menuList }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
