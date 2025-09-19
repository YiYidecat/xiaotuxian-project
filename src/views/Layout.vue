<template>
   <app-topnav></app-topnav>
   <app-header></app-header>
   <main>
      <!-- 二级路由 -->
      <RouterView></RouterView>
  </main>
   <app-footer></app-footer>
</template>

<script>
import appTopnav from '@/components/app-topnav.vue'
import appHeader from '@/components/app-header.vue'
import appFooter from '@/components/app-footer.vue'

export default {
  components: {
    appTopnav,
    appHeader,
    appFooter
  },
  name: 'XtxLayout'
}
</script>

<style scoped lang="less">
</style>
