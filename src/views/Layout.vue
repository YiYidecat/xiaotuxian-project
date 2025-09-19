<template>
   <app-topnav></app-topnav>
   <nav>顶部通栏</nav>
   <header>头部</header>
   <main>
      <!-- 二级路由 -->
      <RouterView></RouterView>
  </main>
   <footer>底部</footer>
</template>

<script>
import appTopnav from '@/components/app-topnav.vue'
export default {
  components: { appTopnav },
  name: 'XtxLayout'
}
</script>

<style scoped lang="less">
</style>
