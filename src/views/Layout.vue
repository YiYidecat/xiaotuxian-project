<template>
   <app-topnav></app-topnav>
   <App-header></App-header>
   <AppHeaderSticky></AppHeaderSticky>
   <main>
      <!-- 二级路由 -->
      <RouterView></RouterView>
  </main>
   <app-footer></app-footer>
</template>

<script>
import appTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import appFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  components: {
    appTopnav,
    AppHeader,
    appFooter,
    AppHeaderSticky
  },
  // 获取下分类数据
  setup () {
    const store = useStore()
    // store.dispatch语法是Vuex出发actions的方法，通常用于异步处理和操作复杂逻辑，然后通过mutations修改状态（state）
    store.dispatch('category/getList')
  },
  name: 'XtxLayout'
}
</script>

<style scoped lang="less">
</style>
